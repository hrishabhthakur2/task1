import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Login from './screens/Auth/Login';
import Signup from './screens/Auth/Signup';
import ResetPassword from './screens/Auth/ResetPassword';
import Dashboard from './screens/Auth/Dashboard';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    secondary: {
      main: '#6a1b9a',
      light: '#9c4dcc',
      dark: '#38006b',
    },
    background: {
      default: '#0A1120',
      paper: '#111827',
    },
    text: {
      primary: '#e0e7ff',
      secondary: '#a5b4fc',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          textTransform: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(147, 51, 234, 0.3)',
          },
        },
        contained: {
          background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
          '&:hover': {
            background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(17, 24, 39, 0.8)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box
            sx={{
              minHeight: '100vh',
              width: '100%',
              background: `linear-gradient(135deg, #0A1120 0%, #1a1c2b 50%, #111827 100%)`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                flex: 1,
                width: '100%',
                height: '100%',
                p: { xs: 2, sm: 3 },
                overflow: 'auto',
              }}
            >
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/reset-password" element={<ResetPassword />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;