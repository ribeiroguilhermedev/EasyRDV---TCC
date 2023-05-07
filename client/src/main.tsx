import React from 'react'
import ReactDOM from 'react-dom/client'
import router from './routes'
import { RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './auth/authContext'
import { queryClient } from './services/queryClient'
import { QueryClientProvider } from 'react-query'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: any) => augmentColor({ color: { main: mainColor } });
const theme = createTheme({
  palette: {
    secondary: createColor("#1d4d6c"),
    // mode: 'light',
    mode: 'dark',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          color: '#ffffffe8',
          borderColor: '#ffffff80',
          "&:hover": {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid #FFF',
          }
        }
      }
    }
  }
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
