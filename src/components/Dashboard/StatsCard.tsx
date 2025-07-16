'use client';

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { StatsCardProps } from '@/types';

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  color,
  trend,
}) => {
  return (
    <Card
      sx={{
        height: '100%',
        minHeight: { xs: '120px', sm: '140px' },
        background: `linear-gradient(135deg, ${color === 'primary' ? '#1976d2' : 
          color === 'secondary' ? '#00acc1' : 
          color === 'success' ? '#2e7d32' : 
          color === 'warning' ? '#ed6c02' : '#d32f2f'}15, transparent)`,
        border: `1px solid ${color === 'primary' ? '#1976d2' : 
          color === 'secondary' ? '#00acc1' : 
          color === 'success' ? '#2e7d32' : 
          color === 'warning' ? '#ed6c02' : '#d32f2f'}30`,
      }}
    >
      <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          textAlign: { xs: 'center', sm: 'left' },
          gap: { xs: 1, sm: 0 }
        }}>
          <Box>
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontWeight: 700, 
                mb: 1,
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
              }}
            >
              {value}
            </Typography>
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
            >
              {title}
            </Typography>
            {trend && (
              <Typography
                variant="caption"
                sx={{
                  color: trend.value > 0 ? 'success.main' : 'error.main',
                  fontWeight: 600,
                  fontSize: { xs: '0.6rem', sm: '0.75rem' }
                }}
              >
                {trend.value > 0 ? '+' : ''}{trend.value}% {trend.label}
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              color: `${color}.main`,
              opacity: 0.7,
              '& svg': {
                fontSize: { xs: '2rem', sm: '2.5rem' }
              }
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};