// src/services/auditService.ts

const API_URL = 'http://localhost:5000/api/audits'; // Backend API URL

export const getAudits = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching audits:', error);
    throw error; // Re-throw the error to be handled in the component
  }
};