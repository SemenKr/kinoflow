import { createSlice } from '@reduxjs/toolkit'

interface UiState {
  globalPendingCount: number
}

const initialState: UiState = {
  globalPendingCount: 0,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startGlobalLoading: state => {
      state.globalPendingCount += 1
    },
    stopGlobalLoading: state => {
      state.globalPendingCount = Math.max(0, state.globalPendingCount - 1)
    },
    resetGlobalLoading: state => {
      state.globalPendingCount = 0
    },
  },
})

export const { startGlobalLoading, stopGlobalLoading, resetGlobalLoading } = uiSlice.actions
export const uiReducer = uiSlice.reducer
