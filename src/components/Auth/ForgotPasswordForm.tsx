'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Link,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import { Email, ArrowBack } from '@mui/icons-material';
import { useAuthStore } from '@/lib/authStore';
import { ForgotPasswordFormData } from '@/types';

interface ForgotPasswordFormProps {
  onSwitchToLogin: () => void;
}

export const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSwitchToLogin,
}) => {
  const { forgotPassword, isLoading } = useAuthStore();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (value: string) => {
    setFormData({ email: value });
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError('Email harus diisi');
      return;
    }

    if (!formData.email.includes('@')) {
      setError('Format email tidak valid');
      return;
    }

    const result = await forgotPassword(formData.email);
    
    if (result) {
      setSuccess(true);
      setError('');
    } else {
      setError('Email tidak ditemukan');
    }
  };

  if (success) {
    return (
      <Card sx={{ maxWidth: 400, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
          <Typography 
            variant="h5" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.25rem', sm: '1.5rem' }
            }}
          >
            Email Terkirim
          </Typography>
          
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              mb: 3,
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Kami telah mengirimkan link reset password ke email Anda. 
            Silakan cek inbox dan ikuti instruksi yang diberikan.
          </Typography>

          <Button
            fullWidth
            variant="outlined"
            onClick={onSwitchToLogin}
            startIcon={<ArrowBack />}
            sx={{ 
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Kembali ke Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card sx={{ maxWidth: 400, width: '100%' }}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: 'center', 
            fontWeight: 600,
            fontSize: { xs: '1.5rem', sm: '2rem' }
          }}
        >
          Lupa Password
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            textAlign: 'center', 
            mb: 3,
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Masukkan email Anda untuk menerima link reset password
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange(e.target.value)}
            disabled={isLoading}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            sx={{ 
              mt: 2, 
              py: { xs: 1.5, sm: 2 },
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Kirim Link Reset'
            )}
          </Button>

          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link
              component="button"
              type="button"
              variant="body2"
              onClick={onSwitchToLogin}
              sx={{ 
                textDecoration: 'none',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}
            >
              <ArrowBack sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
              Kembali ke Login
            </Link>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};