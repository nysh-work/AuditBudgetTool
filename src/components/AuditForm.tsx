// src/components/AuditForm.tsx
import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define styled components (same as before)
const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

interface Audit {
  id: number;
  name: string;
  budget: number;
  status: string;
  startDate: string;
}

interface AuditFormProps {
  onSubmit: (newAudit: Omit<Audit, 'id'>) => void;
}

const AuditForm: React.FC<AuditFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [budget, setBudget] = useState(0);
  const [status, setStatus] = useState('Open');
  const [startDate, setStartDate] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Validate the form data
    if (!name || budget <= 0 || !status || !startDate) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Create a new audit object (without id, backend will assign it)
    const newAudit = {
      name,
      budget: parseFloat(budget.toString()),
      status,
      startDate,
    };

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
      console.log('New audit created:', createdAudit);
      // Call the onSubmit handler to submit the new audit to the parent component
      onSubmit(createdAudit);

      // Clear the form
      setName('');
      setBudget(0);
      setStatus('Open');
      setStartDate('');
    } catch (error) {
      console.error('Error creating audit:', error);
      alert('Failed to create audit.');
    }
  };

  return (
    <Box mt={4}>
      <Typography variant="h6" align="center" gutterBottom>Create New Audit</Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Name"
          required
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Budget"
          type="number"
          required
          fullWidth
          value={budget}
          onChange={(e) => setBudget(parseFloat(e.target.value))}
        />
        <FormControl fullWidth required>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            value={status}
            label="Status"
            onChange={(e) => setStatus(e.target.value as string)}
          >
            <MenuItem value="Open">Open</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          type="date"
          required
          fullWidth
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <Button type="submit" variant="contained" color="primary">
          Create Audit
        </Button>
      </StyledForm>
    </Box>
  );
};

export default AuditForm;