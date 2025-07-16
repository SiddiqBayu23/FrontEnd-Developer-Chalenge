'use client';

import React, { useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  Box,
  Typography,
  Chip,
  Alert,
} from '@mui/material';
import { Save, Calculate } from '@mui/icons-material';
import { GradeInputTableProps, Student } from '@/types';

export const GradeInputTable: React.FC<GradeInputTableProps> = ({
  classData,
  onGradeUpdate,
  onCalculate,
}) => {
  const [localGrades, setLocalGrades] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleGradeChange = (studentId: string, componentId: string, babId: string, value: string) => {
    const key = `${studentId}-${componentId}-${babId}`;
    const numValue = parseFloat(value);
    
    if (isNaN(numValue) || numValue < 0 || numValue > 100) {
      setErrors(prev => ({
        ...prev,
        [key]: 'Nilai harus antara 0-100'
      }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[key];
        return newErrors;
      });
      
      setLocalGrades(prev => ({
        ...prev,
        [key]: numValue
      }));
      
      onGradeUpdate(studentId, componentId, babId, numValue);
    }
  };

  const getGradeValue = (student: Student, componentId: string, babId: string): number => {
    const key = `${student.id}-${componentId}-${babId}`;
    return localGrades[key] ?? student.grades[componentId]?.[babId] ?? 0;
  };

  const getLetterGradeColor = (letterGrade: string) => {
    const gradeColors: { [key: string]: 'success' | 'info' | 'warning' | 'error' } = {
      'A': 'success',
      'A-': 'success',
      'B+': 'info',
      'B': 'info',
      'B-': 'info',
      'C+': 'warning',
      'C': 'warning',
      'C-': 'warning',
      'D+': 'error',
      'D': 'error',
      'E': 'error',
    };
    return gradeColors[letterGrade] || 'default';
  };

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: { xs: 2, sm: 0 }
      }}>
        <Typography 
          variant="h5"
          sx={{ 
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Input Nilai - {classData.name}
        </Typography>
        <Button
          startIcon={<Calculate />}
          variant="contained"
          onClick={onCalculate}
          size={window.innerWidth < 600 ? "medium" : "large"}
          sx={{ 
            minHeight: { xs: '44px', sm: '48px' },
            fontSize: { xs: '0.875rem', sm: '1rem' }
          }}
        >
          Hitung Nilai Akhir
        </Button>
      </Box>

      {Object.keys(errors).length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          Terdapat kesalahan dalam input nilai. Pastikan semua nilai berada dalam rentang 0-100.
        </Alert>
      )}

      <TableContainer 
        component={Paper} 
        sx={{ 
          maxHeight: { xs: 600, sm: 800 },
          '& .MuiTable-root': {
            minWidth: { xs: 800, sm: 1000 }
          }
        }} 
        className="table-responsive"
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                minWidth: { xs: 150, sm: 200 }, 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                Mahasiswa
              </TableCell>
              <TableCell sx={{ 
                minWidth: { xs: 100, sm: 120 }, 
                fontWeight: 'bold',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                NIM
              </TableCell>
              
              {classData.gradeComponents.map((component) =>
                classData.babs.map((bab) => (
                  <TableCell
                    key={`${component.id}-${bab.id}`}
                    sx={{ 
                      minWidth: { xs: 80, sm: 100 }, 
                      textAlign: 'center', 
                      fontWeight: 'bold',
                      p: { xs: 1, sm: 2 }
                    }}
                  >
                    <Box>
                      <Typography 
                        variant="caption" 
                        display="block"
                        sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
                      >
                        {component.name}
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="text.secondary"
                        sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
                      >
                        {bab.name}
                      </Typography>
                    </Box>
                  </TableCell>
                ))
              )}
              
              <TableCell sx={{ 
                minWidth: { xs: 100, sm: 120 }, 
                fontWeight: 'bold', 
                textAlign: 'center',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                Nilai Akhir
              </TableCell>
              <TableCell sx={{ 
                minWidth: { xs: 80, sm: 100 }, 
                fontWeight: 'bold', 
                textAlign: 'center',
                fontSize: { xs: '0.75rem', sm: '0.875rem' }
              }}>
                Grade
              </TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {classData.students.map((student) => (
              <TableRow key={student.id} hover>
                <TableCell sx={{ 
                  fontWeight: 'medium',
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  p: { xs: 1, sm: 2 }
                }}>
                  {student.name}
                </TableCell>
                <TableCell sx={{ 
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  p: { xs: 1, sm: 2 }
                }}>
                  {student.nim}
                </TableCell>
                
                {classData.gradeComponents.map((component) =>
                  classData.babs.map((bab) => {
                    const key = `${student.id}-${component.id}-${bab.id}`;
                    const hasError = errors[key];
                    
                    return (
                      <TableCell 
                        key={`${component.id}-${bab.id}`} 
                        sx={{ 
                          textAlign: 'center',
                          p: { xs: 0.5, sm: 2 }
                        }}
                      >
                        <TextField
                          type="number"
                          value={getGradeValue(student, component.id, bab.id)}
                          onChange={(e) => handleGradeChange(student.id, component.id, bab.id, e.target.value)}
                          size="small"
                          inputProps={{ min: 0, max: 100 }}
                          error={!!hasError}
                          helperText={hasError}
                          sx={{
                            width: { xs: 60, sm: 80 },
                            '& .MuiOutlinedInput-root': {
                              height: { xs: 36, sm: 40 },
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                            },
                            '& .MuiFormHelperText-root': {
                              fontSize: { xs: '0.6rem', sm: '0.75rem' }
                            }
                          }}
                        />
                      </TableCell>
                    );
                  })
                )}
                
                <TableCell sx={{ 
                  textAlign: 'center',
                  p: { xs: 1, sm: 2 }
                }}>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'primary.main',
                      fontSize: { xs: '0.75rem', sm: '1rem' }
                    }}
                  >
                    {student.finalGrade?.toFixed(1) || '-'}
                  </Typography>
                </TableCell>
                
                <TableCell sx={{ 
                  textAlign: 'center',
                  p: { xs: 1, sm: 2 }
                }}>
                  {student.letterGrade && (
                    <Chip
                      label={student.letterGrade}
                      color={getLetterGradeColor(student.letterGrade)}
                      size="small"
                      sx={{ 
                        fontWeight: 'bold',
                        fontSize: { xs: '0.6rem', sm: '0.75rem' },
                        height: { xs: 24, sm: 32 }
                      }}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};