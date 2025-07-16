'use client';

import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { School, People, Assessment, CheckCircle } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { ClassCard } from '@/components/Dashboard/ClassCard';
import { StatsCard } from '@/components/Dashboard/StatsCard';
import { AppLayout } from '@/components/Layout/AppLayout';

export default function Dashboard() {
  const router = useRouter();
  const { classes, setSelectedClass } = useAppStore();

  const totalClasses = classes.length;
  const totalStudents = classes.reduce((sum, cls) => sum + cls.studentCount, 0);
  const configuredClasses = classes.filter(cls => cls.isConfigured).length;
  const averageCompletion = classes.reduce((sum, cls) => sum + cls.completionStatus, 0) / classes.length;

  const handleConfigure = (classData: any) => {
    setSelectedClass(classData);
    router.push('/configuration');
  };

  const handleViewGrades = (classData: any) => {
    setSelectedClass(classData);
    router.push('/grades');
  };

  return (
    <AppLayout>
      <Box className="fade-in">
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            mb: 3,
            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
          }}
        >
          Dashboard OBE
        </Typography>
        
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={6} md={3}>
            <StatsCard
              title="Total Kelas"
              value={totalClasses}
              icon={<School sx={{ fontSize: 40 }} />}
              color="primary"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatsCard
              title="Total Mahasiswa"
              value={totalStudents}
              icon={<People sx={{ fontSize: 40 }} />}
              color="secondary"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatsCard
              title="Kelas Terkonfigurasi"
              value={`${configuredClasses}/${totalClasses}`}
              icon={<CheckCircle sx={{ fontSize: 40 }} />}
              color="success"
            />
          </Grid>
          <Grid item xs={6} sm={6} md={3}>
            <StatsCard
              title="Rata-rata Progress"
              value={`${averageCompletion.toFixed(0)}%`}
              icon={<Assessment sx={{ fontSize: 40 }} />}
              color="warning"
            />
          </Grid>
        </Grid>

        <Typography 
          variant="h5" 
          gutterBottom 
          sx={{ 
            fontWeight: 600, 
            mb: 3,
            fontSize: { xs: '1.25rem', sm: '1.5rem' }
          }}
        >
          Daftar Kelas
        </Typography>
        
        <Grid container spacing={3}>
          {classes.map((classData) => (
            <Grid item xs={12} sm={6} lg={4} key={classData.id}>
              <ClassCard
                classData={classData}
                onConfigure={() => handleConfigure(classData)}
                onViewGrades={() => handleViewGrades(classData)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </AppLayout>
  );
}