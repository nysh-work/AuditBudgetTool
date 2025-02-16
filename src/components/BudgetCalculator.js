import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const BudgetCalculator = () => {
  // Client data state with sample data
  const [clients] = useState([
    {
      id: 'C001',
      name: 'ABC Technology',
      industry: 'ITES',
      revenue: 100,
      complexity: 2,
      internalControls: 2,
      priorExperience: 2
    },
    {
      id: 'C002',
      name: 'XYZ Manufacturing',
      industry: 'Manufacturing',
      revenue: 300,
      complexity: 3,
      internalControls: 2,
      priorExperience: 1
    },
    {
      id: 'C003',
      name: 'PQR Trading',
      industry: 'Trading',
      revenue: 75,
      complexity: 1,
      internalControls: 2,
      priorExperience: 2
    }
  ]);

  // State for tracking selected client and calculated budget
  const [selectedClient, setSelectedClient] = useState(null);
  const [budgetData, setBudgetData] = useState(null);

  // Core configuration objects for calculations
  const baseHours = {
    'Small': {
      planning: 16,
      fieldwork: 80,
      managerReview: 16,
      partnerReview: 8,
      documentation: 24
    },
    'Medium': {
      planning: 24,
      fieldwork: 120,
      managerReview: 24,
      partnerReview: 16,
      documentation: 40
    },
    'Large': {
      planning: 40,
      fieldwork: 200,
      managerReview: 40,
      partnerReview: 24,
      documentation: 56
    },
    'Very Large': {
      planning: 60,
      fieldwork: 300,
      managerReview: 60,
      partnerReview: 40,
      documentation: 80
    }
  };

  const staffAllocation = {
    planning: { partner: 0.20, manager: 0.30, senior: 0.30, junior: 0.20 },
    fieldwork: { partner: 0.05, manager: 0.15, senior: 0.40, junior: 0.40 },
    managerReview: { partner: 0.00, manager: 0.70, senior: 0.30, junior: 0.00 },
    partnerReview: { partner: 0.80, manager: 0.20, senior: 0.00, junior: 0.00 },
    documentation: { partner: 0.05, manager: 0.15, senior: 0.40, junior: 0.40 }
  };
  // Effect hook to trigger budget calculation when client is selected
  useEffect(() => {
    if (selectedClient) {
      calculateBudget(selectedClient);
    }
  }, [selectedClient]);

  // Main budget calculation function
  const calculateBudget = (client) => {
    // Determine company category based on revenue thresholds
    const category = client.revenue <= 50 ? 'Small' :
                    client.revenue <= 250 ? 'Medium' :
                    client.revenue <= 500 ? 'Large' : 'Very Large';

    // Calculate risk multiplier by averaging risk factors
    const multiplier = (client.complexity + client.internalControls + client.priorExperience) / 3;

    // Initialize calculation for each audit phase
    const phases = ['planning', 'fieldwork', 'managerReview', 'partnerReview', 'documentation'];
    const calculatedBudget = {};

    // Calculate hours for each phase with staff allocation
    phases.forEach(phase => {
      const baseHour = baseHours[category][phase];
      const adjustedHours = baseHour * multiplier;
      
      calculatedBudget[phase] = {
        baseHours: baseHour,
        multiplier: multiplier,
        adjustedHours: adjustedHours,
        staffHours: {
          partner: adjustedHours * staffAllocation[phase].partner,
          manager: adjustedHours * staffAllocation[phase].manager,
          senior: adjustedHours * staffAllocation[phase].senior,
          junior: adjustedHours * staffAllocation[phase].junior
        }
      };
    });

    setBudgetData({
      category,
      multiplier,
      phases: calculatedBudget
    });
  };

  // Handle Excel export functionality
  const handleExport = () => {
    if (!budgetData) {
      alert('Please select a client first');
      return;
    }
    
    // Logic for Excel export would go here
    console.log('Exporting budget data:', budgetData);
    alert('Export functionality will be implemented in the next phase');
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-gray-50 min-h-screen">
      {/* Header Section with Client Selection and Export */}
      <div className="mb-8 flex justify-between items-center bg-white p-6 rounded-lg shadow-sm">
        <div className="flex-1 max-w-xs">
          <label 
            htmlFor="client-select" 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Select Client
          </label>
          <select
            id="client-select"
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm 
                     focus:border-primary-500 focus:ring-2 focus:ring-primary-500 
                     focus:ring-opacity-50 bg-white text-gray-700"
            onChange={(e) => {
              const client = clients.find(c => c.id === e.target.value);
              setSelectedClient(client);
            }}
            value={selectedClient?.id || ''}
          >
            <option value="">Choose a client...</option>
            {clients.map(client => (
              <option key={client.id} value={client.id}>
                {client.name} ({client.id})
              </option>
            ))}
          </select>
        </div>

        <button
          className="inline-flex items-center px-4 py-2 bg-primary-600 text-white 
                   font-medium rounded-md hover:bg-primary-700 focus:outline-none 
                   focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 
                   transition-colors ml-4"
          onClick={handleExport}
          disabled={!budgetData}
        >
          <Download className="w-5 h-5 mr-2" />
          Export Budget
        </button>
      </div>
      {budgetData && (
        <div className="space-y-6">
          {/* Summary Cards Section */}
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Budget Summary for {selectedClient?.name}
            </h2>
            
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-sm font-medium text-primary-700">Company Category</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {budgetData.category}
                </p>
                <p className="text-sm text-primary-600 mt-2">
                  Based on revenue of ₹{selectedClient?.revenue} Cr
                </p>
              </div>

              <div className="p-6 bg-primary-50 rounded-lg border border-primary-100">
                <p className="text-sm font-medium text-primary-700">Risk Assessment</p>
                <p className="text-2xl font-bold text-primary-900 mt-1">
                  {budgetData.multiplier.toFixed(2)}x
                </p>
                <p className="text-sm text-primary-600 mt-2">
                  Average of complexity, controls, and experience factors
                </p>
              </div>
            </div>

            {/* Phase-wise Budget Table */}
            <div className="overflow-x-auto mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Detailed Hour Allocation
              </h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Audit Phase
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Base Hours
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Partner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Manager
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Senior
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Junior
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total Hours
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {/* Phase Rows */}
                  {Object.entries(budgetData.phases).map(([phase, data]) => (
                    <tr key={phase} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 capitalize">
                        {phase.replace(/([A-Z])/g, ' $1').trim()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.baseHours.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.staffHours.partner.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.staffHours.manager.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.staffHours.senior.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {data.staffHours.junior.toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                        {data.adjustedHours.toFixed(1)}
                      </td>
                    </tr>
                  ))}

                  {/* Totals Row */}
                  <tr className="bg-gray-50 font-medium hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      Total Hours
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {Object.values(budgetData.phases).reduce((sum, phase) => sum + phase.baseHours, 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {Object.values(budgetData.phases).reduce((sum, phase) => sum + phase.staffHours.partner, 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {Object.values(budgetData.phases).reduce((sum, phase) => sum + phase.staffHours.manager, 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {Object.values(budgetData.phases).reduce((sum, phase) => sum + phase.staffHours.senior, 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      {Object.values(budgetData.phases).reduce((sum, phase) => sum + phase.staffHours.junior, 0).toFixed(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-primary-600">
                      {Object.values(budgetData.phases).reduce((sum, phase) => sum + phase.adjustedHours, 0).toFixed(1)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetCalculator;