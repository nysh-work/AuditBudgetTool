// src/services/auditService.ts
import { Audit } from '../types/audit';

// Define an interface for the budget calculation result
interface AuditBudgetDetails {
  category: string;
  multiplier: number;
  phases: {
    [phase: string]: {
      baseHours: number;
      multiplier: number;
      adjustedHours: number;
    }
  };
  totalHours: number;
}

// Base Hours Configuration with explicit typing
const BASE_HOURS: Record<string, Record<string, number>> = {
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

// Existing methods with placeholder implementations
export const getAudits = async (): Promise<Audit[]> => {
  // Implement actual data fetching logic
  return [];
};

export const createAudit = async (audit: Audit): Promise<Audit> => {
  // Implement actual audit creation logic
  return audit;
};

// Robust budget calculation method
export const calculateAuditBudget = (audit: Audit): AuditBudgetDetails => {
  // Determine company category
  const category = audit.revenue <= 50 ? 'Small' :
                   audit.revenue <= 250 ? 'Medium' :
                   audit.revenue <= 500 ? 'Large' : 'Very Large';

  // Calculate risk multiplier
  const multiplier = (audit.complexity + audit.internalControls + audit.priorExperience) / 3;

  // Define phases with type safety
  const phases: string[] = ['planning', 'fieldwork', 'managerReview', 'partnerReview', 'documentation'];

  // Use typed object for calculated budget
  const calculatedBudget: AuditBudgetDetails['phases'] = {};

  // Iterate through phases with type-safe approach
  phases.forEach(phase => {
    const baseHour = BASE_HOURS[category][phase];
    const adjustedHours = baseHour * multiplier;
   
    calculatedBudget[phase] = {
      baseHours: baseHour,
      multiplier: multiplier,
      adjustedHours: adjustedHours
    };
  });

  // Return fully typed budget details
  return {
    category,
    multiplier,
    phases: calculatedBudget,
    totalHours: Object.values(calculatedBudget).reduce((sum, phase) => sum + phase.adjustedHours, 0)
  };
};