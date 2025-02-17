import React, { useState, ChangeEvent } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

// Define mappings for string values to numerical scores
const CONTROL_MAPPING = {
  'weak': 1,
  'moderate': 2,
  'strong': 3
};

const COMPLEXITY_MAPPING = {
  'low': 1,
  'medium': 2,
  'high': 3
};

const EXPERIENCE_MAPPING = {
  'low': 1,
  'medium': 2,
  'high': 3
};

interface BudgetCalculatorFormProps {
  onSubmit: (formData: { 
    revenue: number; 
    complexity: number; 
    internalControls: number; 
    priorExperience: number 
  }) => void;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
}));

const BudgetCalculatorForm: React.FC<BudgetCalculatorFormProps> = ({ onSubmit }) => {
  const [revenue, setRevenue] = useState(0);
  const [control, setControl] = useState<keyof typeof CONTROL_MAPPING>('weak');
  const [complexity, setComplexity] = useState<keyof typeof COMPLEXITY_MAPPING>('low');
  const [experience, setExperience] = useState<keyof typeof EXPERIENCE_MAPPING>('high');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    // Convert string values to numerical scores
    onSubmit({
      revenue,
      complexity: COMPLEXITY_MAPPING[complexity],
      internalControls: CONTROL_MAPPING[control],
      priorExperience: EXPERIENCE_MAPPING[experience]
    });
  };

  return (
    <StyledPaper>
      <Typography variant="h6" gutterBottom>Budget Calculator Input</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal">
          <TextField
            label="Revenue (in Cr)"
            type="number"
            value={revenue}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setRevenue(Number(e.target.value))}
            helperText="Enter company revenue in Crores"
            required
          />
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="control-label">Internal Controls</InputLabel>
          <Select
            labelId="control-label"
            value={control}
            onChange={(e) => setControl(e.target.value as keyof typeof CONTROL_MAPPING)}
            label="Internal Controls"
            required
          >
            <MenuItem value="weak">Weak</MenuItem>
            <MenuItem value="moderate">Moderate</MenuItem>
            <MenuItem value="strong">Strong</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="complexity-label">Complexity</InputLabel>
          <Select
            labelId="complexity-label"
            value={complexity}
            onChange={(e) => setComplexity(e.target.value as keyof typeof COMPLEXITY_MAPPING)}
            label="Complexity"
            required
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="experience-label">Team Experience</InputLabel>
          <Select
            labelId="experience-label"
            value={experience}
            onChange={(e) => setExperience(e.target.value as keyof typeof EXPERIENCE_MAPPING)}
            label="Team Experience"
            required
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
        
        <Box mt={3}>
          <Button variant="contained" color="primary" type="submit">
            Calculate
          </Button>
        </Box>
      </form>
    </StyledPaper>
  );
};

export default BudgetCalculatorForm;