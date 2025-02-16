import React, { useState } from 'react';

const ClientForm = ({ onClientAdd, onCancel, existingClient = null }) => {
  // Initialize form state with either existing client data or empty values
  const [formData, setFormData] = useState({
    id: existingClient?.id || '',
    name: existingClient?.name || '',
    industry: existingClient?.industry || '',
    revenue: existingClient?.revenue || '',
    complexity: existingClient?.complexity || 1,
    internalControls: existingClient?.internalControls || 1,
    priorExperience: existingClient?.priorExperience || 1
  });

  // List of industries for the dropdown
  const industries = [
    'ITES',
    'Manufacturing',
    'Trading',
    'Banking',
    'Services',
    'Construction',
    'NBFC',
    'Insurance',
    'NGO',
    'Others'
  ];

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // For numerical fields, convert string values to numbers
    const processedValue = ['revenue', 'complexity', 'internalControls', 'priorExperience']
      .includes(name) ? Number(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Generate a new ID if this is a new client
    const clientData = existingClient ? formData : {
      ...formData,
      id: `C${String(Date.now()).slice(-3)}` // Simple ID generation
    };
    onClientAdd(clientData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold mb-6">
        {existingClient ? 'Edit Client' : 'Add New Client'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Client Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Client Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        {/* Industry Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          >
            <option value="">Select Industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Revenue Field */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Revenue (in Crores)
          </label>
          <input
            type="number"
            name="revenue"
            value={formData.revenue}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md 
                     focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            required
          />
        </div>

        {/* Risk Factor Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Complexity (1-3)
            </label>
            <input
              type="number"
              name="complexity"
              value={formData.complexity}
              onChange={handleChange}
              min="1"
              max="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Internal Controls (1-3)
            </label>
            <input
              type="number"
              name="internalControls"
              value={formData.internalControls}
              onChange={handleChange}
              min="1"
              max="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Prior Experience (1-3)
            </label>
            <input
              type="number"
              name="priorExperience"
              value={formData.priorExperience}
              onChange={handleChange}
              min="1"
              max="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
                       focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-600 text-white rounded-md 
                     hover:bg-primary-700 focus:outline-none focus:ring-2 
                     focus:ring-offset-2 focus:ring-primary-500"
          >
            {existingClient ? 'Update Client' : 'Add Client'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;