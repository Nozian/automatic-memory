import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <MenuBookIcon sx={{ mr: 2 }} />
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Book Search Helper
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/search"
          >
            検索 / Search
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/about"
          >
            このサイトについて / About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header; 