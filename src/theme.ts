// src/theme.ts
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6',  // A nice primary color
    },
    secondary: {
      main: '#19857b',  // A complementary secondary color
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Or your preferred font
  },
});

export default theme;