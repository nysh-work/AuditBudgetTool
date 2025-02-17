import React, { useState, FormEvent } from 'react';
import { 
  TextField, 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel, 
  Box, 
  Typography, 
  Paper 
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Audit } from '../types/audit';
import { createAudit } from '../services/auditService.ts';

// Budget Calculation Configuration (moved from previous component)
const baseHours = {
  'Small': { planning: 16, fieldwork: 80, managerReview: 16, partnerReview: 8, documentation: 24 },
  'Medium': { planning: 24, fieldwork: 120, managerReview: 24, partnerReview: 16, documentation: 40 },
  'Large': { planning: 40, fieldwork: 200, managerReview: 40, partnerReview: 24, documentation: 56 },
  'Very Large': { planning: 60, fieldwork: 300, managerReview: 60, partnerReview: 40, documentation: 80 }
};

const AuditForm: React.FC = () => {
  // Expanded state to capture detailed audit parameters
  const [clientName, setClientName] = useState('');
  const [revenue, setRevenue] = useState(0);
  const [complexity, setComplexity] = useState(1);
  const [internalControls, setInternalControls] = useState(1);
  const [priorExperience, setPriorExperience] = useState(1);
  const [startDate, setStartDate] = useState('');

  // Calculated hours (will be dynamically computed)
  const [calculatedHours, setCalculatedHours] = useState(0);

  // Budget Calculation Method
  const calculateBudgetHours = () => {
    // Determine company category based on revenue
    const category = revenue <= 50 ? 'Small' :
                     revenue <= 250 ? 'Medium' :
                     revenue <= 500 ? 'Large' : 'Very Large';

    // Calculate risk multiplier
    const multiplier = (complexity + internalControls + priorExperience) / 3;

    // Calculate total base hours
    const baseHoursForCategory = baseHours[category];
    const totalBaseHours = Object.values(baseHoursForCategory).reduce((a, b) => a + b, 0);

    // Adjust hours based on multiplier
    return Math.round(totalBaseHours * multiplier);
  };

  // Form submission handler
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    // Calculate hours before submission
    const hours = calculateBudgetHours();

    const newAudit: Audit = {
      clientName,
      revenue,
      complexity,
      internalControls,
      priorExperience,
      hours,
      status: 'Open',
      startDate
    };

    try {
      await createAudit(newAudit);
      alert(`Audit created with ${hours} estimated hours`);
      
      // Reset form
      setClientName('');
      setRevenue(0);
      setComplexity(1);
      setInternalControls(1);
      setPriorExperience(1);
      setStartDate('');
    } catch (error) {
      console.error('Failed to create audit:', error);
      alert('Failed to create audit. Please try again.');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, margin: 'auto' }}>
      <Typography variant="h6" align="center" gutterBottom>
        Create New Audit
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Client Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Client Revenue (in Cr)"
            type="number"
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            required
          />
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Audit Complexity</InputLabel>
          <Select
            value={complexity}
            label="Audit Complexity"
            onChange={(e) => setComplexity(Number(e.target.value))}
          >
            {[1, 2, 3].map(level => (
              <MenuItem key={level} value={level}>
                {level === 1 ? 'Low' : level === 2 ? 'Medium' : 'High'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Internal Controls</InputLabel>
          <Select
            value={internalControls}
            label="Internal Controls"
            onChange={(e) => setInternalControls(Number(e.target.value))}
          >
            {[1, 2, 3].map(level => (
              <MenuItem key={level} value={level}>
                {level === 1 ? 'Weak' : level === 2 ? 'Moderate' : 'Strong'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Prior Experience</InputLabel>
          <Select
            value={priorExperience}
            label="Prior Experience"
            onChange={(e) => setPriorExperience(Number(e.target.value))}
          >
            {[1, 2, 3].map(level => (
              <MenuItem key={level} value={level}>
                {level === 1 ? 'Low' : level === 2 ? 'Medium' : 'High'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <TextField
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            required
          />
        </FormControl>

        {calculatedHours > 0 && (
          <Typography variant="body2" color="primary" sx={{ mt: 2 }}>
            Estimated Audit Hours: {calculatedHours}
          </Typography>
        )}

        <Box mt={3} display="flex" justifyContent="center">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
          >
            Create Audit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default AuditForm;