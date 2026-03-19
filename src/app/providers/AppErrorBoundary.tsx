import i18n from '@/app/providers/i18n'
import { enqueueToast } from '@/shared/ui/toast/toast.slice'
import { Alert, Box, Button, Stack, Typography } from '@mui/material'
import { Component, type ErrorInfo, type ReactNode } from 'react'
import { store } from '@/app/model/store'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Unhandled React error', error, errorInfo)

    store.dispatch(
      enqueueToast({
        severity: 'error',
        message: i18n.t('toast_runtime_error'),
      }),
    )
  }

  private handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            px: 2,
          }}
        >
          <Alert severity="error" sx={{ maxWidth: 560, width: '100%' }}>
            <Stack spacing={2}>
              <Typography variant="h6">{i18n.t('app_fatal_error_title')}</Typography>
              <Typography variant="body2">{i18n.t('app_fatal_error_description')}</Typography>
              <Box>
                <Button variant="contained" onClick={this.handleReload}>
                  {i18n.t('app_reload')}
                </Button>
              </Box>
            </Stack>
          </Alert>
        </Box>
      )
    }

    return this.props.children
  }
}
