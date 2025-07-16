'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Alert,
  Grid,
  Slider,
  Chip,
  Paper,
} from '@mui/material';
import { Save, Refresh } from '@mui/icons-material';
import { ComponentConfigurationProps, GradeComponent } from '@/types';

export const ComponentConfiguration: React.FC<ComponentConfigurationProps> = ({
  classData,
  onSave,
}) => {
  const [components, setComponents] = useState<GradeComponent[]>(classData.gradeComponents);
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const total = components.reduce((sum, comp) => sum + comp.percentage, 0);
    setTotalPercentage(total);
    
    const newErrors: string[] = [];
    if (total !== 100) {
      newErrors.push(`Total persentase harus 100% (saat ini: ${total}%)`);
    }
    
    components.forEach(comp => {
      const babTotal = Object.values(comp.babContributions).reduce((sum, val) => sum + val, 0);
      if (babTotal !== 100) {
        newErrors.push(`Kontribusi bab untuk ${comp.name} harus 100% (saat ini: ${babTotal}%)`);
      }
    });
    
    setErrors(newErrors);
  }, [components]);

  const handlePercentageChange = (componentId: string, percentage: number) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === componentId ? { ...comp, percentage } : comp
      )
    );
  };

  const handleBabContributionChange = (componentId: string, babId: string, value: number) => {
    setComponents(prev =>
      prev.map(comp =>
        comp.id === componentId
          ? {
              ...comp,
              babContributions: {
                ...comp.babContributions,
                [babId]: value,
              },
            }
          : comp
      )
    );
  };

  const handleSave = () => {
    if (errors.length === 0) {
      onSave(components);
    }
  };

  const handleReset = () => {
    setComponents(classData.gradeComponents);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 0, sm: 2 } }}>
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              fontSize: { xs: '1.25rem', sm: '1.5rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Konfigurasi Komponen Nilai - {classData.name}
          </Typography>
          
          {errors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            mb: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 }
          }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mr: { xs: 0, sm: 2 },
                fontSize: { xs: '1rem', sm: '1.25rem' }
              }}
            >
              Total Persentase:
            </Typography>
            <Chip
              label={`${totalPercentage}%`}
              color={totalPercentage === 100 ? 'success' : 'error'}
              variant="outlined"
            />
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={{ xs: 2, sm: 3 }}>
        {components.map((component) => (
          <Grid item xs={12} sm={6} lg={6} key={component.id}>
            <Card>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography 
                  variant="h6" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '1rem', sm: '1.25rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {component.name}
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    gutterBottom
                    sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      textAlign: { xs: 'center', sm: 'left' }
                    }}
                  >
                    Persentase: {component.percentage}%
                  </Typography>
                  <Slider
                    value={component.percentage}
                    onChange={(_, value) => handlePercentageChange(component.id, value as number)}
                    min={0}
                    max={50}
                    marks={[
                      { value: 0, label: '0%' },
                      { value: 25, label: '25%' },
                      { value: 50, label: '50%' },
                    ]}
                    valueLabelDisplay="auto"
                    sx={{ 
                      mb: 2,
                      '& .MuiSlider-markLabel': {
                        fontSize: { xs: '0.6rem', sm: '0.75rem' }
                      }
                    }}
                  />
                </Box>
                
                <Typography 
                  variant="subtitle2" 
                  gutterBottom
                  sx={{ 
                    fontSize: { xs: '0.8rem', sm: '0.875rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  Kontribusi Bab:
                </Typography>
                
                {classData.babs.map((bab) => (
                  <Box key={bab.id} sx={{ mb: 2 }}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mb: 1,
                      flexDirection: { xs: 'column', sm: 'row' },
                      alignItems: { xs: 'center', sm: 'flex-start' },
                      gap: { xs: 0.5, sm: 0 }
                    }}>
                      <Typography 
                        variant="body2"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        {bab.name}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="primary"
                        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                      >
                        {component.babContributions[bab.id] || 0}%
                      </Typography>
                    </Box>
                    <Slider
                      value={component.babContributions[bab.id] || 0}
                      onChange={(_, value) =>
                        handleBabContributionChange(component.id, bab.id, value as number)
                      }
                      min={0}
                      max={50}
                      size="small"
                      valueLabelDisplay="auto"
                    />
                  </Box>
                ))}
                
                <Paper
                  variant="outlined"
                  sx={{
                    p: { xs: 1, sm: 1.5 },
                    backgroundColor: 'grey.50',
                    textAlign: 'center',
                    mt: 2,
                  }}
                >
                  <Typography 
                    variant="caption" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
                  >
                    Total Kontribusi Bab: {' '}
                    {Object.values(component.babContributions).reduce((sum, val) => sum + val, 0)}%
                  </Typography>
                </Paper>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ 
        display: 'flex', 
        justifyContent: { xs: 'center', sm: 'flex-end' }, 
        gap: 2, 
        mt: 3,
        flexDirection: { xs: 'column', sm: 'row' }
      }}>
        <Button
          startIcon={<Refresh />}
          variant="outlined"
          onClick={handleReset}
          sx={{ 
            minHeight: { xs: '44px', sm: '36px' },
            order: { xs: 2, sm: 1 }
          }}
        >
          Reset
        </Button>
        <Button
          startIcon={<Save />}
          variant="contained"
          onClick={handleSave}
          disabled={errors.length > 0}
          sx={{ 
            minHeight: { xs: '44px', sm: '36px' },
            order: { xs: 1, sm: 2 }
          }}
        >
          Simpan Konfigurasi
        </Button>
      </Box>
    </Box>
  );
};