// src/data/mockData.ts

interface Audit {
    id: number;
    name: string;
    budget: number;
    status: string;
    startDate: string;
  }
  
  export const mockAudits: Audit[] = [
    { id: 1, name: 'Audit 1', budget: 10000, status: 'In Progress', startDate: '2024-03-01' },
    { id: 2, name: 'Audit 2', budget: 15000, status: 'Open', startDate: '2024-03-15' },
    { id: 3, name: 'Audit 3', budget: 8000, status: 'Completed', startDate: '2024-02-01' },
    { id: 4, name: 'Audit 4', budget: 12000, status: 'In Progress', startDate: '2024-04-01' },
    { id: 5, name: 'Audit 5', budget: 9000, status: 'Open', startDate: '2024-04-15' },
  ];