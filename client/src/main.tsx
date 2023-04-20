import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/authContext'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
