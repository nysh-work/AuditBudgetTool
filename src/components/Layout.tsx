// src/components/Layout.tsx
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
}));

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <StyledAppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Audit Budget Tool
          </Typography>
          <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
          <Button color="inherit" component={Link} to="/audit-budget">Audit Budget</Button>
          <Button color="inherit" component={Link} to="/budget-calculator">Budget Calculator</Button>
          <Button color="inherit" component={Link} to="/audit-form">Audit Form</Button> {/* Link to the AuditForm */}
        </Toolbar>
      </StyledAppBar>
        {children}
    </div>
  );
};

export default Layout;