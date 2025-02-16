import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Users, Calculator, Clock, LineChart, LogIn } from 'lucide-react';

// Top-level application component with navigation and content areas
const AuditBudgetApp = () => {
  // State for user authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock user data for demonstration
  const [user, setUser] = useState({
    name: 'Nishanth Vasisht',
    role: 'Manager',
    email: 'nishanth@varmaandvarma.com'
  });

  // Mock client data
  const [clients, setClients] = useState([
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
    }
  ]);

  // Function to handle Excel export
  const handleExport = (section) => {
    console.log(`Exporting ${section} to Excel`);
    // Excel export logic would go here
  };

  // Login screen component
  const LoginScreen = () => (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Audit Budget System</h2>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          onClick={() => setIsAuthenticated(true)}
        >
          Login with Office 365
        </button>
      </div>
    </div>
  );

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Audit Budget System</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.name} ({user.role})</span>
            <button 
              className="text-sm text-red-600 hover:text-red-800"
              onClick={() => setIsAuthenticated(false)}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid grid-cols-5 gap-4 bg-white p-2 rounded-lg shadow">
            <TabsTrigger value="dashboard" onClick={() => setActiveTab('dashboard')}>
              <LineChart className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="clients" onClick={() => setActiveTab('clients')}>
              <Users className="w-4 h-4 mr-2" />
              Clients
            </TabsTrigger>
            <TabsTrigger value="budget" onClick={() => setActiveTab('budget')}>
              <Calculator className="w-4 h-4 mr-2" />
              Budget
            </TabsTrigger>
            <TabsTrigger value="timesheet" onClick={() => setActiveTab('timesheet')}>
              <Clock className="w-4 h-4 mr-2" />
              Time Entry
            </TabsTrigger>
            <TabsTrigger value="reports" onClick={() => setActiveTab('reports')}>
              <LineChart className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
          </TabsList>

          {/* Content sections */}
          <div className="bg-white rounded-lg shadow p-6">
            {/* Export button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => handleExport(activeTab)}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export to Excel
              </button>
            </div>

            <TabsContent value="dashboard">
              <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-blue-800">Active Clients</h3>
                  <p className="text-2xl font-bold text-blue-600">{clients.length}</p>
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
            </TabsContent>

            <TabsContent value="clients">
              <h2 className="text-xl font-semibold mb-4">Client Management</h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Industry
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Revenue (Cr)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {clients.map((client) => (
                    <tr key={client.id}>
                      <td className="px-6 py-4 whitespace-nowrap">{client.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.industry}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{client.revenue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="budget">
              <h2 className="text-xl font-semibold mb-4">Budget Calculator</h2>
              {/* Budget calculation interface would go here */}
            </TabsContent>

            <TabsContent value="timesheet">
              <h2 className="text-xl font-semibold mb-4">Time Entry</h2>
              {/* Time entry interface would go here */}
            </TabsContent>

            <TabsContent value="reports">
              <h2 className="text-xl font-semibold mb-4">Reports</h2>
              {/* Reports and analytics would go here */}
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </div>
  );
};

export default AuditBudgetApp;