'use client';

import React from 'react';
import { Box, Typography, Button, Alert, Grid } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { GradeInputTable } from '@/components/Grades/GradeInputTable';
import { GradeCalculationDisplay } from '@/components/Grades/GradeCalculationDisplay';
import { AppLayout } from '@/components/Layout/AppLayout';

export default function Grades() {
  const router = useRouter();
  const { selectedClass, updateStudentGrade, calculateFinalGrades } = useAppStore();

  const handleGradeUpdate = (studentId: string, componentId: string, babId: string, grade: number) => {
    updateStudentGrade(studentId, componentId, babId, grade);
  };

  const handleCalculate = () => {
    if (selectedClass) {
      calculateFinalGrades(selectedClass.id);
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

  if (!selectedClass.isConfigured) {
    return (
      <AppLayout>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Alert severity="warning" sx={{ mb: 2 }}>
            Kelas belum dikonfigurasi. Silakan konfigurasi komponen nilai terlebih dahulu.
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
            Input & Analisis Nilai
          </Typography>
        </Box>
        
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12}>
            <GradeInputTable
              classData={selectedClass}
              onGradeUpdate={handleGradeUpdate}
              onCalculate={handleCalculate}
            />
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 4 }}>
            <GradeCalculationDisplay classData={selectedClass} />
          </Grid>
        </Grid>
      </Box>
    </AppLayout>
  );
}