import React, { useState } from 'react';
import BudgetCalculator from './BudgetCalculator';

const AuditBudgetApp = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'budget':
        return <BudgetCalculator />;
      case 'dashboard':
      default:
        return (
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-medium text-blue-800">Active Clients</h3>
                <p className="text-2xl font-bold text-blue-600">3</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-medium text-green-800">Total Budget Hours</h3>
                <p className="text-2xl font-bold text-green-600">1,240</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-medium text-purple-800">Current Month Hours</h3>
                <p className="text-2xl font-bold text-purple-600">320</p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Audit Budget System</h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-4">
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'dashboard' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('dashboard')}
            >
              Dashboard
            </button>
            <button
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                activeTab === 'budget' 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('budget')}
            >
              Budget Calculator
            </button>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default AuditBudgetApp;