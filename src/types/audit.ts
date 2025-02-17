export interface Audit {
  id?: number;
  name: string;
  clientName: string;
  revenue: number;
  complexity: number;
  internalControls: number;
  priorExperience: number;
  hours: number;  // Calculated, not manually entered
  status: 'Open' | 'In Progress' | 'Completed';
  startDate: string;
}