// backend/src/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json()); // Add middleware to parse JSON request bodies

let audits = [ // Move the mock audits to a variable
  { id: 1, name: 'Audit 1', budget: 10000, status: 'In Progress', startDate: '2024-03-01' },
  { id: 2, name: 'Audit 2', budget: 15000, status: 'Open', startDate: '2024-03-15' },
  { id: 3, name: 'Audit 3', budget: 8000, status: 'Completed', startDate: '2024-02-01' },
  { id: 4, name: 'Audit 4', budget: 12000, status: 'In Progress', startDate: '2024-04-01' },
  { id: 5, name: 'Audit 5', budget: 9000, status: 'Open', startDate: '2024-04-15' },
];

// GET audits
app.get('/api/audits', (req: Request, res: Response) => {
  res.json(audits);
});

// POST new audit
app.post('/api/audits', (req: Request, res: Response) => {
  const newAudit = req.body;
  newAudit.id = audits.length + 1; // Assign a new ID (in memory only)
  audits.push(newAudit);
  res.status(201).json(newAudit); // Send the new audit with status code 201 (Created)
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});