// src/components/BudgetCalculator.tsx
import React, { useState, useEffect } from 'react';
import { getAudits, calculateAuditBudget } from '../services/auditService.ts';

const BudgetCalculator = () => {
  const [audits, setAudits] = useState([]);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [budgetDetails, setBudgetDetails] = useState(null);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const fetchedAudits = await getAudits();
        setAudits(fetchedAudits);
      } catch (error) {
        console.error('Failed to fetch audits', error);
      }
    };

    fetchAudits();
  }, []);

  const handleAuditSelect = (auditId) => {
    const audit = audits.find(a => a.id === auditId);
    setSelectedAudit(audit);
    
    if (audit) {
      const budgetCalculation = calculateAuditBudget(audit);
      setBudgetDetails(budgetCalculation);
    }
  };

  return (
    <div>
      <select onChange={(e) => handleAuditSelect(Number(e.target.value))}>
        <option>Select an Audit</option>
        {audits.map(audit => (
          <option key={audit.id} value={audit.id}>
            {audit.clientName}
          </option>
        ))}
      </select>

      {budgetDetails && (
        <div>
          <h3>Budget Details for {selectedAudit.clientName}</h3>
          <p>Company Category: {budgetDetails.category}</p>
          <p>Risk Multiplier: {budgetDetails.multiplier.toFixed(2)}</p>
          
          <table>
            <thead>
              <tr>
                <th>Phase</th>
                <th>Base Hours</th>
                <th>Adjusted Hours</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(budgetDetails.phases).map(([phase, details]) => (
                <tr key={phase}>
                  <td>{phase}</td>
                  <td>{details.baseHours}</td>
                  <td>{details.adjustedHours.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;