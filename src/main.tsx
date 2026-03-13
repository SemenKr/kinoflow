import { store } from '@/app/model/store'
import '@/styles/globals.css'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { router } from '@/router/router'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
