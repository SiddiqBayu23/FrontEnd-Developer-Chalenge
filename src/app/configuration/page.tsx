'use client';

import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ComponentConfiguration } from '@/components/Configuration/ComponentConfiguration';
import { AppLayout } from '@/components/Layout/AppLayout';
import { GradeComponent } from '@/types';

export default function Configuration() {
  const router = useRouter();
  const { selectedClass, updateClassConfiguration } = useAppStore();

  const handleSave = (components: GradeComponent[]) => {
    if (selectedClass) {
      updateClassConfiguration(selectedClass.id, components);
      alert('Konfigurasi berhasil disimpan!');
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  if (!selectedClass) {
    return (
      <AppLayout>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Alert severity="info" sx={{ mb: 2 }}>
            Pilih kelas terlebih dahulu dari dashboard
          </Alert>
          <Button
            startIcon={<ArrowBack />}
            variant="contained"
            onClick={handleBack}
          >
            Kembali ke Dashboard
          </Button>
        </Box>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <Box className="fade-in">
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Button
            startIcon={<ArrowBack />}
            variant="outlined"
            onClick={handleBack}
            sx={{ 
              mr: { xs: 0, sm: 2 },
              minHeight: { xs: '44px', sm: '36px' },
              alignSelf: { xs: 'flex-start', sm: 'center' }
            }}
          >
            Kembali
          </Button>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Konfigurasi Komponen Nilai
          </Typography>
        </Box>
        
        <ComponentConfiguration
          classData={selectedClass}
          onSave={handleSave}
        />
      </Box>
    </AppLayout>
  );
}