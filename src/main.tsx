import { store } from '@/app/model/store'
import { AppThemeProvider } from '@/app/providers/ThemeProvider'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from '@/router/router'
import { RouterProvider } from 'react-router-dom'
import '@/app/providers/i18n'
import '@/styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <AppThemeProvider>
      <RouterProvider router={router} />
    </AppThemeProvider>
  </Provider>,
)
