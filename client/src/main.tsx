import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/authContext'
import { queryClient } from './services/queryClient'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
