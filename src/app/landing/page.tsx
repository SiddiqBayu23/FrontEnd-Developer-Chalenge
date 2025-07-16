'use client';

import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Chip,
} from '@mui/material';
import { Search, School, People, Person, Assessment } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchType, setSearchType] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchKeyword, 'Type:', searchType);
  };

  const handleApplicationClick = (userType: string) => {
    router.push('/auth');
  };

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <AppBar position="static" sx={{ backgroundColor: '#1565c0', boxShadow: 'none' }}>
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* University Logo */}
            <Box
              sx={{
                width: 50,
                height: 50,
                backgroundColor: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <School sx={{ color: '#1565c0', fontSize: 30 }} />
            </Box>

            {/* Award Badge */}
            <Box
              sx={{
                width: 40,
                height: 40,
                backgroundColor: '#ff9800',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              <Typography sx={{ color: 'white', fontSize: '12px', fontWeight: 'bold' }}>
                BEST
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              textAlign: 'center',
              flex: 1
            }}
          >
            PORTAL UDINUS
          </Typography>

          <Box sx={{ width: { xs: 50, sm: 90 } }} />
        </Toolbar>
      </AppBar>

      {/* Navigation Tabs */}
      <Box sx={{ backgroundColor: '#1976d2', py: 1 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
            {['Program Studi', 'Data Dosen', 'Kalender Pendidikan'].map((label) => (
              <Chip
                key={label}
                label={label}
                sx={{
                  backgroundColor: '#0d47a1',
                  color: 'white',
                  '&:hover': { backgroundColor: '#1565c0' }
                }}
              />
            ))}
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Search Section */}
        <Card sx={{ mb: 4, boxShadow: 2 }}>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: { xs: '1rem', sm: '1.25rem' } }}>
              Pencarian Data
            </Typography>

            <Typography variant="subtitle1" gutterBottom sx={{ mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' } }}>
              Masukkan Keyword
            </Typography>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'stretch', sm: 'flex-end' }
              }}
            >
              <TextField
                fullWidth
                placeholder="Keyword : [Nama Mahasiswa] [NIM] [Nama Dosen] [NIDN] [NPP]"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': { fontSize: { xs: '0.875rem', sm: '1rem' } }
                }}
              />

              <FormControl sx={{ minWidth: { xs: '100%', sm: 120 } }}>
                <InputLabel>Pilih</InputLabel>
                <Select
                  value={searchType}
                  label="Pilih"
                  onChange={(e) => setSearchType(e.target.value)}
                  sx={{ '& .MuiSelect-select': { fontSize: { xs: '0.875rem', sm: '1rem' } } }}
                >
                  <MenuItem value="mahasiswa">Mahasiswa</MenuItem>
                  <MenuItem value="dosen">Dosen</MenuItem>
                  <MenuItem value="staff">Staff</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  backgroundColor: '#1565c0',
                  minHeight: { xs: '48px', sm: '56px' },
                  px: { xs: 2, sm: 3 },
                  fontSize: { xs: '0.875rem', sm: '1rem' }
                }}
              >
                Cari
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Applications Section */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.secondary', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
            Aplikasi
          </Typography>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 'bold', mb: 4, fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' } }}
        >
          Daftar Aplikasi
        </Typography>

        {/* Application Cards */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ maxWidth: 600 }}>
            <Grid item xs={12}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: '2px solid #1976d2',
                  '&:hover': { transform: 'translateY(-4px)', boxShadow: 4, borderColor: '#1565c0' }
                }}
                onClick={() => handleApplicationClick('dosen')}
              >
                <CardContent
                  sx={{
                    textAlign: 'center',
                    p: { xs: 4, sm: 6 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        width: { xs: 100, sm: 120 },
                        height: { xs: 100, sm: 120 },
                        backgroundColor: '#e8f5e8',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3
                      }}
                    >
                      <Assessment sx={{ fontSize: { xs: 50, sm: 60 }, color: '#2e7d32' }} />
                    </Box>
                  </Box>
                  <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, fontSize: { xs: '1.5rem', sm: '2rem' }, mb: 2, color: '#1976d2' }}
                  >
                    OBE Dashboard
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 500, fontSize: { xs: '1rem', sm: '1.25rem' }, mb: 2, color: 'text.primary' }}
                  >
                    Sistem Penilaian Dosen
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 3, fontSize: { xs: '0.875rem', sm: '1rem' }, maxWidth: 400, lineHeight: 1.6 }}
                  >
                    Sistem manajemen nilai berbasis Outcome Based Education (OBE) untuk memudahkan dosen dalam mengelola
                    dan menghitung nilai mahasiswa
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <Chip label="OBE System" color="primary" sx={{ fontWeight: 600 }} />
                    <Chip label="Grade Management" color="secondary" sx={{ fontWeight: 600 }} />
                    <Chip label="BTIK UDINUS" color="success" sx={{ fontWeight: 600 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 6, py: 3, borderTop: '1px solid #e0e0e0' }}>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}>
            © 2024 Universitas Dian Nuswantoro. All rights reserved.
          </Typography>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 1, fontSize: { xs: '0.6rem', sm: '0.75rem' } }}
          >
            Portal Akademik Universitas Dian Nuswantoro - Sistem Informasi Terpadu
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
