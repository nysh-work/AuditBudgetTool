// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { Typography, Box, Card, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { getAudits } from '../services/auditService.ts';
import AuditForm from '../components/AuditForm.tsx';

// Define the Audit interface (same as before)

interface Audit {
  id: number;
  name: string;
  budget: number;
  status: string;
  startDate: string;
}

const Dashboard = () => {
  const [audits, setAudits] = useState<Audit[]>([]);

  const fetchData = async () => {
    try {
      const data: Audit[] = await getAudits();
      setAudits(data);
    } catch (error) {
      console.error('Failed to fetch audits:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateAudit = async (newAudit: Omit<Audit, 'id'>) => {
    try {
      const response = await fetch('http://localhost:5000/api/audits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAudit),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const createdAudit = await response.json();
      fetchData();

    } catch (error) {
      console.error('Error creating audit:', error);
      alert('Failed to create audit.');
    }
  };

  const totalBudget = audits.reduce((acc, audit) => acc + audit.budget, 0);
  const completedAudits = audits.filter(audit => audit.status === 'Completed').length;
  const inProgressAudits = audits.filter(audit => audit.status === 'In Progress').length;

  return (
    <Box m={4}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Welcome to the Dashboard!
      </Typography>
      <Typography variant="body1">
        This is where you'll manage your audit budgets and data.
      </Typography>

      <AuditForm onSubmit={handleCreateAudit} />

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Total Budget</Typography>
            <Typography variant="body1">${totalBudget}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">Completed Audits</Typography>
            <Typography variant="body1">{completedAudits}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="h6">In Progress Audits</Typography>
            <Typography variant="body1">{inProgressAudits}</Typography>
          </Card>
        </Grid>
      </Grid>
       {/* Add Table Here */}
      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Audits Data:
        </Typography>
        <TableContainer component={Card}>
          <Table sx={{ minWidth: 650 }} aria-label="audits table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Budget</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Start Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {audits.map((audit) => (
                <TableRow
                  key={audit.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {audit.name}
                  </TableCell>
                  <TableCell align="right">{audit.budget}</TableCell>
                  <TableCell align="right">{audit.status}</TableCell>
                  <TableCell align="right">{audit.startDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Dashboard;