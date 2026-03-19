import { Alert, Snackbar } from '@mui/material'
import { dismissToast } from '@/shared/ui/toast/toast.slice'
import { useAppDispatch, useAppSelector } from '@/hooks'

export const ToastViewport = () => {
  const dispatch = useAppDispatch()
  const currentToast = useAppSelector(state => state.toast.items[0] ?? null)

  const handleClose = () => {
    if (!currentToast) return
    dispatch(dismissToast(currentToast.id))
  }

  return (
    <Snackbar
      open={!!currentToast}
      autoHideDuration={4500}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {currentToast ? (
        <Alert
          onClose={handleClose}
          severity={currentToast.severity}
          variant="filled"
          sx={{ width: '100%', maxWidth: 420 }}
        >
          {currentToast.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  )
}
