'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  People,
  Settings,
  Assessment,
  CheckCircle,
  Warning,
} from '@mui/icons-material';
import { ClassCardProps } from '@/types';

export const ClassCard: React.FC<ClassCardProps> = ({
  classData,
  onConfigure,
  onViewGrades,
}) => {
  const getStatusColor = (isConfigured: boolean) => {
    return isConfigured ? 'success' : 'warning';
  };

  const getStatusIcon = (isConfigured: boolean) => {
    return isConfigured ? <CheckCircle /> : <Warning />;
  };

  return (
    <Card
      sx={{
        height: '100%',
        minHeight: { xs: '280px', sm: '320px' },
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: { xs: 'none', sm: 'translateY(-4px)' },
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mb: 2,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Typography 
            variant="h6" 
            component="h2" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1rem', sm: '1.25rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            {classData.name}
          </Typography>
          <Chip
            icon={getStatusIcon(classData.isConfigured)}
            label={classData.isConfigured ? 'Configured' : 'Not Configured'}
            color={getStatusColor(classData.isConfigured)}
            size="small"
            sx={{ alignSelf: { xs: 'center', sm: 'flex-start' } }}
          />
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            textAlign: { xs: 'center', sm: 'left' },
            fontSize: { xs: '0.75rem', sm: '0.875rem' }
          }}
        >
          {classData.semester}
        </Typography>
        
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          justifyContent: { xs: 'center', sm: 'flex-start' }
        }}>
          <People sx={{ mr: 1, color: 'text.secondary' }} />
          <Typography 
            variant="body2"
            sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
          >
            {classData.studentCount} mahasiswa
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="body2" 
            color="text.secondary" 
            sx={{ 
              mb: 1,
              textAlign: { xs: 'center', sm: 'left' },
              fontSize: { xs: '0.75rem', sm: '0.875rem' }
            }}
          >
            Progress: {classData.completionStatus}%
          </Typography>
          <LinearProgress
            variant="determinate"
            value={classData.completionStatus}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
            }}
          />
        </Box>
        
        <Box sx={{ 
          display: 'flex', 
          gap: 1, 
          mt: 'auto',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <Button
            startIcon={<Settings />}
            variant="outlined"
            size="small"
            onClick={onConfigure}
            sx={{ 
              flex: 1,
              minHeight: { xs: '44px', sm: '36px' }
            }}
          >
            Konfigurasi
          </Button>
          <Button
            startIcon={<Assessment />}
            variant="contained"
            size="small"
            onClick={onViewGrades}
            disabled={!classData.isConfigured}
            sx={{ 
              flex: 1,
              minHeight: { xs: '44px', sm: '36px' }
            }}
          >
            Input Nilai
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};