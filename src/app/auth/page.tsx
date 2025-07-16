'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { School } from '@mui/icons-material';
import { LoginForm } from '@/components/Auth/LoginForm';
import { RegisterForm } from '@/components/Auth/RegisterForm';
import { ForgotPasswordForm } from '@/components/Auth/ForgotPasswordForm';
import { useRouter } from 'next/navigation';

type AuthMode = 'login' | 'register' | 'forgot-password';

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>('login');
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const renderForm = () => {
    switch (mode) {
      case 'login':
        return (
          <LoginForm
            onSwitchToRegister={() => setMode('register')}
            onSwitchToForgotPassword={() => setMode('forgot-password')}
          />
        );
      case 'register':
        return (
          <RegisterForm
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={() => setMode('login')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1976d2 0%, #00acc1 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 4 },
          }}
        >
          {/* Header */}
          <Paper
            elevation={0}
            sx={{
              p: { xs: 2, sm: 3 },
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: 2,
              textAlign: 'center',
              width: '100%',
              maxWidth: 400,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                mb: 1,
              }}
            >
              <School 
                sx={{ 
                  fontSize: { xs: 32, sm: 40 }, 
                  color: 'primary.main' 
                }} 
              />
              <Typography
                variant={isMobile ? 'h5' : 'h4'}
                component="h1"
                sx={{
                  fontWeight: 700,
                  color: 'primary.main',
                  fontSize: { xs: '1.5rem', sm: '2rem' }
                }}
              >
                OBE Dashboard
              </Typography>
            </Box>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{
                fontWeight: 500,
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              BTIK UDINUS
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 1,
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              Outcome Based Education Management System
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: 'block',
                mt: 2,
                color: 'primary.main',
                cursor: 'pointer',
                textDecoration: 'underline',
                fontSize: { xs: '0.7rem', sm: '0.8rem' }
              }}
              onClick={() => router.push('/landing')}
            >
              ← Kembali ke Portal UDINUS
            </Typography>
          </Paper>

          {/* Auth Form */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {renderForm()}
          </Box>

          {/* Footer */}
          <Typography
            variant="caption"
            color="rgba(255, 255, 255, 0.8)"
            sx={{
              textAlign: 'center',
              mt: 2,
              fontSize: { xs: '0.6rem', sm: '0.75rem' }
            }}
          >
            © 2024 BTIK UDINUS. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}