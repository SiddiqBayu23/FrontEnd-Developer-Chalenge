'use client';

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Paper,
  LinearProgress,
  Chip,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { GradeCalculationDisplayProps } from '@/types';

export const GradeCalculationDisplay: React.FC<GradeCalculationDisplayProps> = ({
  classData,
}) => {
  const gradeDistribution = React.useMemo(() => {
    const distribution: { [key: string]: number } = {};
    
    classData.students.forEach(student => {
      if (student.letterGrade) {
        distribution[student.letterGrade] = (distribution[student.letterGrade] || 0) + 1;
      }
    });
    
    return Object.entries(distribution).map(([grade, count]) => ({
      grade,
      count,
      percentage: (count / classData.students.length) * 100,
    }));
  }, [classData.students]);

  const averageGrade = React.useMemo(() => {
    const total = classData.students.reduce((sum, student) => sum + (student.finalGrade || 0), 0);
    return total / classData.students.length;
  }, [classData.students]);

  const componentAverages = React.useMemo(() => {
    return classData.gradeComponents.map(component => {
      const totalScore = classData.students.reduce((sum, student) => {
        let componentScore = 0;
        classData.babs.forEach(bab => {
          const babContribution = component.babContributions[bab.id] || 0;
          const babGrade = student.grades[component.id]?.[bab.id] || 0;
          componentScore += (babGrade * babContribution) / 100;
        });
        return sum + componentScore;
      }, 0);
      
      return {
        name: component.name,
        average: totalScore / classData.students.length,
        percentage: component.percentage,
      };
    });
  }, [classData]);

  const COLORS = ['#1976d2', '#00acc1', '#2e7d32', '#ed6c02', '#d32f2f'];

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 0, sm: 2 } }}>
      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
          textAlign: { xs: 'center', sm: 'left' },
          mb: { xs: 2, sm: 3 }
        }}
      >
        Analisis Nilai - {classData.name}
      </Typography>
      
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12} sm={12} md={4}>
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
                Statistik Umum
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  Rata-rata Kelas
                </Typography>
                <Typography 
                  variant="h4" 
                  color="primary"
                  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {averageGrade.toFixed(1)}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  Total Mahasiswa
                </Typography>
                <Typography 
                  variant="h4" 
                  color="secondary"
                  sx={{ 
                    fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {classData.students.length}
                </Typography>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  Progress Penilaian
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={classData.completionStatus}
                  sx={{ height: 8, borderRadius: 4, mb: 1 }}
                />
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ 
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    textAlign: { xs: 'center', sm: 'left' }
                  }}
                >
                  {classData.completionStatus}% selesai
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={12} md={8}>
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
                Rata-rata per Komponen
              </Typography>
              <ResponsiveContainer width="100%" height={{ xs: 250, sm: 300 }}>
                <BarChart data={componentAverages}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="average" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={6}>
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
                Distribusi Grade
              </Typography>
              <ResponsiveContainer width="100%" height={{ xs: 250, sm: 300 }}>
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ grade, percentage }) => `${grade} (${percentage.toFixed(1)}%)`}
                    outerRadius={{ xs: 60, sm: 80 }}
                    fill="#8884d8"
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={6}>
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
                Detail Distribusi
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                gap: { xs: 1, sm: 2 }
              }}>
                {gradeDistribution.map((item, index) => (
                  <Paper 
                    key={item.grade} 
                    variant="outlined" 
                    sx={{ p: { xs: 1.5, sm: 2 } }}
                  >
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      flexDirection: { xs: 'column', sm: 'row' },
                      gap: { xs: 1, sm: 0 }
                    }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 1,
                        flexDirection: { xs: 'column', sm: 'row' }
                      }}>
                        <Chip
                          label={item.grade}
                          sx={{
                            backgroundColor: COLORS[index % COLORS.length],
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        />
                        <Typography 
                          variant="body2"
                          sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            textAlign: { xs: 'center', sm: 'left' }
                          }}
                        >
                          {item.count} mahasiswa
                        </Typography>
                      </Box>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          textAlign: { xs: 'center', sm: 'right' }
                        }}
                      >
                        {item.percentage.toFixed(1)}%
                      </Typography>
                    </Box>
                  </Paper>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};