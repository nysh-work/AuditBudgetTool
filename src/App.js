import React, { useState } from 'react'; // Import useState
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.tsx';
import Dashboard from './pages/Dashboard.tsx';
import AuditBudgetApp from './components/AuditBudgetApp';
import BudgetCalculator from './components/BudgetCalculator';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme.ts';
import Layout from './components/Layout.tsx';

function App() {
  const [key, setKey] = useState(0); // Add a state variable

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter key={key}> {/* Use the key prop */}
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path=".pages/Login" element={<Login />} />
            <Route path=".pages/Dashboard" element={<Dashboard />} />
            <Route path="/audit-budget" element={<AuditBudgetApp />} />
            <Route path="/budget-calculator" element={<BudgetCalculator />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;