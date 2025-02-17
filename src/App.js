import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx'; // Corrected: Uppercase and .tsx
import Dashboard from './pages/dashboard.tsx'; // Corrected: Uppercase and .tsx
import AuditBudgetApp from './components/AuditBudgetApp';
import BudgetCalculator from './components/BudgetCalculator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import Layout from './components/Layout.tsx'; // Import the Layout component
import AuditForm from './pages/AuditForm.tsx'; //Here it goes the form page
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/audit-budget" element={<AuditBudgetApp />} />
            <Route path="/budget-calculator" element={<BudgetCalculator />} />
             <Route path="/audit-form" element={<AuditForm />} />{/*Here it goes the form page*/}
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;