'use client';

import React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
  Avatar,
} from '@mui/material';
import { Menu } from '@mui/icons-material';
import { User } from '@/types';

interface AppBarProps {
  onMenuClick: () => void;
  onProfileClick: (event: React.MouseEvent<HTMLElement>) => void;
  user: User | null;
}

export const AppBar: React.FC<AppBarProps> = ({ onMenuClick, onProfileClick, user }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: 'white',
        color: 'text.primary',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Toolbar>
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
        )}
        <Typography 
          variant={isMobile ? "subtitle1" : "h6"} 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
          {isMobile ? 'OBE Dashboard' : 'OBE Dashboard - BTIK UDINUS'}
        </Typography>
        <IconButton 
          color="inherit" 
          onClick={onProfileClick}
          sx={{ p: 0 }}
        >
          <Avatar 
            sx={{ 
              width: { xs: 32, sm: 40 }, 
              height: { xs: 32, sm: 40 },
              bgcolor: 'secondary.main',
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>
        </IconButton>
      </Toolbar>
    </MuiAppBar>
  );
};