import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit'

export type ToastSeverity = 'error' | 'warning' | 'info' | 'success'

interface ToastItem {
  id: string
  severity: ToastSeverity
  message: string
}

interface ToastState {
  items: ToastItem[]
  lastSignature: string | null
  lastEnqueuedAt: number
}

interface EnqueueToastPayload {
  severity: ToastSeverity
  message: string
}

const DEDUPE_WINDOW_MS = 4000

const initialState: ToastState = {
  items: [],
  lastSignature: null,
  lastEnqueuedAt: 0,
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    enqueueToast: {
      reducer: (state, action: PayloadAction<ToastItem>) => {
        const signature = `${action.payload.severity}:${action.payload.message}`
        const now = Date.now()

        if (state.lastSignature === signature && now - state.lastEnqueuedAt < DEDUPE_WINDOW_MS) {
          return
        }

        state.items.push(action.payload)
        state.lastSignature = signature
        state.lastEnqueuedAt = now
      },
      prepare: (payload: EnqueueToastPayload) => ({
        payload: {
          id: nanoid(),
          ...payload,
        },
      }),
    },
    dismissToast: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

export const { enqueueToast, dismissToast } = toastSlice.actions
export const toastReducer = toastSlice.reducer
