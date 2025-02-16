import React from 'react';
import './App.css';
import AuditBudgetApp from './components/AuditBudgetApp';
import BudgetCalculator from './components/BudgetCalculator';

function App() {
  return (
    <div className="App">
      <AuditBudgetApp />
      <BudgetCalculator />
    </div>
  );
}

export default App;