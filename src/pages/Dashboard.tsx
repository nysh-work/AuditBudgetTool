// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Card, 
  Grid, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow 
} from '@mui/material';
import { getAudits } from '../services/auditService.ts';
import { Audit } from '../../backend/src/types/Audit.ts';

const Dashboard: React.FC = () => {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Compute dashboard metrics
  const dashboardMetrics = React.useMemo(() => {
    return {
      totalHours: audits.reduce((acc, audit) => acc + audit.hours, 0),
      completedAudits: audits.filter(audit => audit.status === 'Completed').length,
      inProgressAudits: audits.filter(audit => audit.status === 'In Progress').length,
      openAudits: audits.filter(audit => audit.status === 'Open').length
    };
  }, [audits]);

  // Fetch data effect
  useEffect(() => {
    const fetchAudits = async () => {
      try {
        setIsLoading(true);
        const data = await getAudits();
        setAudits(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch audits:', err);
        setError('Unable to load audit data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAudits();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Loading audit data...</Typography>
      </Box>
    );
  }

  // Render error state
  if (error) {
    return (
      <Box color="error.main" textAlign="center" mt={4}>
        <Typography variant="h6">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box m={4}>
      <Typography variant="h4" component="h1" gutterBottom color="primary">
        Welcome to the Dashboard!
      </Typography>
      <Typography variant="body1" mb={3}>
        Manage and track your audit hours and progress.
      </Typography>

      {/* Metrics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Total Audit Hours</Typography>
            <Typography variant="h4" color="primary">
              {dashboardMetrics.totalHours} hrs
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">Completed Audits</Typography>
            <Typography variant="h4" color="success.main">
              {dashboardMetrics.completedAudits}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ p: 2, textAlign: 'center' }}>
            <Typography variant="h6">In Progress Audits</Typography>
            <Typography variant="h4" color="warning.main">
              {dashboardMetrics.inProgressAudits}
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Audit Details Table */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Audit Name</TableCell>
              <TableCell align="right">Hours</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Start Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {audits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell>{audit.name}</TableCell>
                <TableCell align="right">{audit.hours} hrs</TableCell>
                <TableCell align="right">{audit.status}</TableCell>
                <TableCell align="right">{audit.startDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;