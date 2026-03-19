import { AppErrorBoundary } from '@/app/providers/AppErrorBoundary'
import { store } from '@/app/model/store'
import { AppThemeProvider } from '@/app/providers/ThemeProvider'
import { ToastViewport } from '@/shared/ui/toast/ToastViewport'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from '@/router/router'
import { RouterProvider } from 'react-router-dom'
import '@/app/providers/i18n'
import '@/styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppErrorBoundary>
      <AppThemeProvider>
        <RouterProvider router={router} />
        <ToastViewport />
      </AppThemeProvider>
    </AppErrorBoundary>
  </Provider>,
)
