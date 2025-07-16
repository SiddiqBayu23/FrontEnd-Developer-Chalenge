'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
} from '@mui/material';
import {
  Download,
  Print,
  Assessment,
  TrendingUp,
  School,
  People,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAppStore } from '@/lib/store';
import { AppLayout } from '@/components/Layout/AppLayout';

export default function Reports() {
  const { classes } = useAppStore();
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [reportType, setReportType] = useState<string>('summary');

  const configuredClasses = classes.filter(cls => cls.isConfigured);
  const selectedClassData = selectedClass === 'all' ? null : classes.find(cls => cls.id === selectedClass);

  // Calculate overall statistics
  const overallStats = React.useMemo(() => {
    const totalStudents = classes.reduce((sum, cls) => sum + cls.studentCount, 0);
    const configuredCount = classes.filter(cls => cls.isConfigured).length;
    const averageCompletion = classes.reduce((sum, cls) => sum + cls.completionStatus, 0) / classes.length;
    
    const allStudents = classes.flatMap(cls => cls.students);
    const averageGrade = allStudents.length > 0 
      ? allStudents.reduce((sum, student) => sum + (student.finalGrade || 0), 0) / allStudents.length
      : 0;

    return {
      totalClasses: classes.length,
      totalStudents,
      configuredClasses: configuredCount,
      averageCompletion: Math.round(averageCompletion),
      averageGrade: Math.round(averageGrade * 100) / 100,
    };
  }, [classes]);

  // Grade distribution data
  const gradeDistributionData = React.useMemo(() => {
    const distribution: { [key: string]: number } = {};
    
    classes.forEach(cls => {
      cls.students.forEach(student => {
        if (student.letterGrade) {
          distribution[student.letterGrade] = (distribution[student.letterGrade] || 0) + 1;
        }
      });
    });
    
    return Object.entries(distribution).map(([grade, count]) => ({
      grade,
      count,
      percentage: (count / classes.reduce((sum, cls) => sum + cls.students.length, 0)) * 100,
    }));
  }, [classes]);

  // Class performance data
  const classPerformanceData = React.useMemo(() => {
    return configuredClasses.map(cls => {
      const averageGrade = cls.students.length > 0
        ? cls.students.reduce((sum, student) => sum + (student.finalGrade || 0), 0) / cls.students.length
        : 0;
      
      return {
        name: cls.name,
        average: Math.round(averageGrade * 100) / 100,
        students: cls.students.length,
        completion: cls.completionStatus,
      };
    });
  }, [configuredClasses]);

  const handleExportReport = () => {
    const reportData = {
      timestamp: new Date().toISOString(),
      overallStats,
      classPerformance: classPerformanceData,
      gradeDistribution: gradeDistributionData,
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `obe-report-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handlePrintReport = () => {
    window.print();
  };

  const COLORS = ['#1976d2', '#00acc1', '#2e7d32', '#ed6c02', '#d32f2f'];

  return (
    <AppLayout>
      <Box className="fade-in">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 3,
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 2, sm: 0 }
        }}>
          <Typography 
            variant="h4" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Laporan OBE
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Button
              startIcon={<Download />}
              variant="outlined"
              onClick={handleExportReport}
              sx={{ 
                minHeight: { xs: '44px', sm: '36px' },
                flex: { xs: 1, sm: 'none' }
              }}
            >
              Export
            </Button>
            <Button
              startIcon={<Print />}
              variant="contained"
              onClick={handlePrintReport}
              sx={{ 
                minHeight: { xs: '44px', sm: '36px' },
                flex: { xs: 1, sm: 'none' }
              }}
            >
              Print
            </Button>
          </Box>
        </Box>

        {/* Filter Controls */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Pilih Kelas</InputLabel>
                  <Select
                    value={selectedClass}
                    label="Pilih Kelas"
                    onChange={(e) => setSelectedClass(e.target.value)}
                    sx={{ 
                      '& .MuiSelect-select': {
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }
                    }}
                  >
                    <MenuItem value="all">Semua Kelas</MenuItem>
                    {configuredClasses.map((cls) => (
                      <MenuItem key={cls.id} value={cls.id}>
                        {cls.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Jenis Laporan</InputLabel>
                  <Select
                    value={reportType}
                    label="Jenis Laporan"
                    onChange={(e) => setReportType(e.target.value)}
                    sx={{ 
                      '& .MuiSelect-select': {
                        fontSize: { xs: '0.875rem', sm: '1rem' }
                      }
                    }}
                  >
                    <MenuItem value="summary">Ringkasan</MenuItem>
                    <MenuItem value="detailed">Detail</MenuItem>
                    <MenuItem value="performance">Performa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Overall Statistics */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <School sx={{ 
                  fontSize: { xs: 30, sm: 40 }, 
                  color: 'primary.main', 
                  mb: 1 
                }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'primary.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                  }}
                >
                  {overallStats.totalClasses}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  Total Kelas
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <People sx={{ 
                  fontSize: { xs: 30, sm: 40 }, 
                  color: 'secondary.main', 
                  mb: 1 
                }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'secondary.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                  }}
                >
                  {overallStats.totalStudents}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  Total Mahasiswa
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <Assessment sx={{ 
                  fontSize: { xs: 30, sm: 40 }, 
                  color: 'success.main', 
                  mb: 1 
                }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'success.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                  }}
                >
                  {overallStats.configuredClasses}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  Kelas Terkonfigurasi
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={4} md={2.4}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <TrendingUp sx={{ 
                  fontSize: { xs: 30, sm: 40 }, 
                  color: 'warning.main', 
                  mb: 1 
                }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'warning.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                  }}
                >
                  {overallStats.averageCompletion}%
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  Rata-rata Progress
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={2.4}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <Assessment sx={{ 
                  fontSize: { xs: 30, sm: 40 }, 
                  color: 'info.main', 
                  mb: 1 
                }} />
                <Typography 
                  variant="h4" 
                  sx={{ 
                    fontWeight: 700, 
                    color: 'info.main',
                    fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2rem' }
                  }}
                >
                  {overallStats.averageGrade}
                </Typography>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}
                >
                  Rata-rata Nilai
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
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
                  Performa Kelas
                </Typography>
                <ResponsiveContainer width="100%" height={{ xs: 250, sm: 300 }}>
                  <BarChart data={classPerformanceData}>
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
                  Distribusi Grade
                </Typography>
                <ResponsiveContainer width="100%" height={{ xs: 250, sm: 300 }}>
                  <PieChart>
                    <Pie
                      data={gradeDistributionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ grade, percentage }) => `${grade} (${percentage.toFixed(1)}%)`}
                      outerRadius={{ xs: 60, sm: 80 }}
                      fill="#8884d8"
                      dataKey="count"
                    >
                      {gradeDistributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Detailed Table */}
        {selectedClassData && (
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
                Detail Nilai - {selectedClassData.name}
              </Typography>
              <TableContainer 
                component={Paper}
                className="table-responsive"
                sx={{
                  '& .MuiTable-root': {
                    minWidth: { xs: 600, sm: 800 }
                  }
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold',
                        p: { xs: 1, sm: 2 }
                      }}>
                        Nama Mahasiswa
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold',
                        p: { xs: 1, sm: 2 }
                      }}>
                        NIM
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold',
                        p: { xs: 1, sm: 2 }
                      }}>
                        Nilai Akhir
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold',
                        p: { xs: 1, sm: 2 }
                      }}>
                        Grade
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        fontWeight: 'bold',
                        p: { xs: 1, sm: 2 }
                      }}>
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedClassData.students.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell sx={{ 
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
                        <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                          <Typography sx={{ 
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}>
                          {student.finalGrade?.toFixed(1) || '-'}
                          </Typography>
                        </TableCell>
                        <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                          {student.letterGrade && (
                            <Chip
                              label={student.letterGrade}
                              color={
                                ['A', 'A-'].includes(student.letterGrade) ? 'success' :
                                ['B+', 'B', 'B-'].includes(student.letterGrade) ? 'info' :
                                ['C+', 'C', 'C-'].includes(student.letterGrade) ? 'warning' : 'error'
                              }
                              size="small"
                              sx={{ 
                                fontSize: { xs: '0.6rem', sm: '0.75rem' },
                                height: { xs: 24, sm: 32 }
                              }}
                            />
                          )}
                        </TableCell>
                        <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                          <Chip
                            label={student.finalGrade && student.finalGrade >= 55 ? 'Lulus' : 'Tidak Lulus'}
                            color={student.finalGrade && student.finalGrade >= 55 ? 'success' : 'error'}
                            size="small"
                            sx={{ 
                              fontSize: { xs: '0.6rem', sm: '0.75rem' },
                              height: { xs: 24, sm: 32 }
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        )}

        {configuredClasses.length === 0 && (
          <Alert severity="info">
            Belum ada kelas yang dikonfigurasi. Silakan konfigurasi kelas terlebih dahulu untuk melihat laporan.
          </Alert>
        )}
      </Box>
    </AppLayout>
  );
}