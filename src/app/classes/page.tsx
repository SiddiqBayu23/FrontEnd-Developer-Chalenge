'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  School,
  People,
  Settings,
  Assessment,
} from '@mui/icons-material';
import { useAppStore } from '@/lib/store';
import { AppLayout } from '@/components/Layout/AppLayout';
import { Class } from '@/types';

interface NewClassForm {
  name: string;
  semester: string;
  studentCount: number;
  description: string;
}

export default function Classes() {
  const { classes, addClass, updateClass, deleteClass } = useAppStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingClass, setEditingClass] = useState<Class | null>(null);
  const [formData, setFormData] = useState<NewClassForm>({
    name: '',
    semester: '',
    studentCount: 0,
    description: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const currentYear = new Date().getFullYear();
  const semesters = [
    `Ganjil ${currentYear}/${currentYear + 1}`,
    `Genap ${currentYear}/${currentYear + 1}`,
    `Ganjil ${currentYear - 1}/${currentYear}`,
    `Genap ${currentYear - 1}/${currentYear}`,
  ];

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nama mata kuliah harus diisi';
    }

    if (!formData.semester) {
      newErrors.semester = 'Semester harus dipilih';
    }

    if (formData.studentCount <= 0) {
      newErrors.studentCount = 'Jumlah mahasiswa harus lebih dari 0';
    }

    if (formData.studentCount > 100) {
      newErrors.studentCount = 'Jumlah mahasiswa tidak boleh lebih dari 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenDialog = (classToEdit?: Class) => {
    if (classToEdit) {
      setEditingClass(classToEdit);
      setFormData({
        name: classToEdit.name,
        semester: classToEdit.semester,
        studentCount: classToEdit.studentCount,
        description: classToEdit.description || '',
      });
    } else {
      setEditingClass(null);
      setFormData({
        name: '',
        semester: semesters[0],
        studentCount: 20,
        description: '',
      });
    }
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingClass(null);
    setFormData({
      name: '',
      semester: '',
      studentCount: 0,
      description: '',
    });
    setErrors({});
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    if (editingClass) {
      // Update existing class
      updateClass(editingClass.id, {
        ...editingClass,
        name: formData.name,
        semester: formData.semester,
        studentCount: formData.studentCount,
        description: formData.description,
      });
    } else {
      // Add new class
      addClass({
        name: formData.name,
        semester: formData.semester,
        studentCount: formData.studentCount,
        description: formData.description,
      });
    }

    handleCloseDialog();
  };

  const handleDeleteClass = (classId: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
      deleteClass(classId);
    }
  };

  const handleInputChange = (field: keyof NewClassForm, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

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
            Manajemen Kelas
          </Typography>
          <Button
            startIcon={<Add />}
            variant="contained"
            onClick={() => handleOpenDialog()}
            sx={{ 
              minHeight: { xs: '44px', sm: '36px' },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            Tambah Kelas
          </Button>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: 4 }}>
          <Grid item xs={6} sm={6} md={3}>
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
                  {classes.length}
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
          <Grid item xs={6} sm={6} md={3}>
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
                  {classes.reduce((sum, cls) => sum + cls.studentCount, 0)}
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
          <Grid item xs={6} sm={6} md={3}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <Settings sx={{ 
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
                  {classes.filter(cls => cls.isConfigured).length}
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
          <Grid item xs={6} sm={6} md={3}>
            <Card>
              <CardContent sx={{ 
                textAlign: 'center',
                p: { xs: 1.5, sm: 3 }
              }}>
                <Assessment sx={{ 
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
                  {Math.round(classes.reduce((sum, cls) => sum + cls.completionStatus, 0) / classes.length) || 0}%
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
        </Grid>

        {/* Classes Table */}
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
              Daftar Kelas
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
                      Nama Mata Kuliah
                    </TableCell>
                    <TableCell sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 'bold',
                      p: { xs: 1, sm: 2 }
                    }}>
                      Semester
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 'bold',
                      p: { xs: 1, sm: 2 }
                    }}>
                      Jumlah Mahasiswa
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 'bold',
                      p: { xs: 1, sm: 2 }
                    }}>
                      Status
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 'bold',
                      p: { xs: 1, sm: 2 }
                    }}>
                      Progress
                    </TableCell>
                    <TableCell align="center" sx={{ 
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      fontWeight: 'bold',
                      p: { xs: 1, sm: 2 }
                    }}>
                      Aksi
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classes.map((classData) => (
                    <TableRow key={classData.id} hover>
                      <TableCell sx={{ p: { xs: 1, sm: 2 } }}>
                        <Typography 
                          variant="subtitle2" 
                          sx={{ 
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' }
                          }}
                        >
                          {classData.name}
                        </Typography>
                        {classData.description && (
                          <Typography 
                            variant="caption" 
                            color="text.secondary"
                            sx={{ fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
                          >
                            {classData.description}
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        p: { xs: 1, sm: 2 }
                      }}>
                        {classData.semester}
                      </TableCell>
                      <TableCell align="center" sx={{ 
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        p: { xs: 1, sm: 2 }
                      }}>
                        {classData.studentCount}
                      </TableCell>
                      <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                        <Chip
                          label={classData.isConfigured ? 'Configured' : 'Not Configured'}
                          color={classData.isConfigured ? 'success' : 'warning'}
                          size="small"
                          sx={{ 
                            fontSize: { xs: '0.6rem', sm: '0.75rem' },
                            height: { xs: 24, sm: 32 }
                          }}
                        />
                      </TableCell>
                      <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                        <Typography 
                          variant="body2"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        >
                          {classData.completionStatus}%
                        </Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ p: { xs: 1, sm: 2 } }}>
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(classData)}
                          color="primary"
                          sx={{ 
                            p: { xs: 0.5, sm: 1 },
                            '& svg': { fontSize: { xs: '1rem', sm: '1.25rem' } }
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteClass(classData.id)}
                          color="error"
                          sx={{ 
                            p: { xs: 0.5, sm: 1 },
                            '& svg': { fontSize: { xs: '1rem', sm: '1.25rem' } }
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {classes.length === 0 && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Belum ada kelas yang ditambahkan. Klik tombol "Tambah Kelas" untuk menambah kelas baru.
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Class Dialog */}
        <Dialog 
          open={openDialog} 
          onClose={handleCloseDialog} 
          maxWidth="sm" 
          fullWidth
          PaperProps={{
            sx: {
              m: { xs: 2, sm: 4 },
              width: { xs: 'calc(100% - 32px)', sm: '100%' }
            }
          }}
        >
          <DialogTitle>
            {editingClass ? 'Edit Kelas' : 'Tambah Kelas Baru'}
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Box sx={{ pt: 2 }}>
              <TextField
                fullWidth
                label="Nama Mata Kuliah"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { fontSize: { xs: '0.875rem', sm: '1rem' } }
                }}
              />

              <FormControl fullWidth sx={{ mb: 2 }} error={!!errors.semester}>
                <InputLabel>Semester</InputLabel>
                <Select
                  value={formData.semester}
                  label="Semester"
                  onChange={(e) => handleInputChange('semester', e.target.value)}
                  sx={{ 
                    '& .MuiSelect-select': {
                      fontSize: { xs: '0.875rem', sm: '1rem' }
                    }
                  }}
                >
                  {semesters.map((semester) => (
                    <MenuItem key={semester} value={semester}>
                      {semester}
                    </MenuItem>
                  ))}
                </Select>
                {errors.semester && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                    {errors.semester}
                  </Typography>
                )}
              </FormControl>

              <TextField
                fullWidth
                label="Jumlah Mahasiswa"
                type="number"
                value={formData.studentCount}
                onChange={(e) => handleInputChange('studentCount', parseInt(e.target.value) || 0)}
                error={!!errors.studentCount}
                helperText={errors.studentCount}
                inputProps={{ min: 1, max: 100 }}
                sx={{ mb: 2 }}
                InputProps={{
                  sx: { fontSize: { xs: '0.875rem', sm: '1rem' } }
                }}
              />

              <TextField
                fullWidth
                label="Deskripsi (Opsional)"
                multiline
                rows={3}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Deskripsi singkat tentang mata kuliah..."
                InputProps={{
                  sx: { fontSize: { xs: '0.875rem', sm: '1rem' } }
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ 
            p: { xs: 2, sm: 3 },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1, sm: 0 }
          }}>
            <Button onClick={handleCloseDialog}>
              Batal
            </Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingClass ? 'Update' : 'Tambah'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </AppLayout>
  );
}