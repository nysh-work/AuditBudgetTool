"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/index.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 5000; // Choose a port number
app.use((0, cors_1.default)()); // Enable CORS
app.get('/api/audits', (req, res) => {
    const mockAudits = [
        { id: 1, name: 'Audit 1', budget: 10000, status: 'In Progress', startDate: '2024-03-01' },
        { id: 2, name: 'Audit 2', budget: 15000, status: 'Open', startDate: '2024-03-15' },
        { id: 3, name: 'Audit 3', budget: 8000, status: 'Completed', startDate: '2024-02-01' },
        { id: 4, name: 'Audit 4', budget: 12000, status: 'In Progress', startDate: '2024-04-01' },
        { id: 5, name: 'Audit 5', budget: 9000, status: 'Open', startDate: '2024-04-15' },
    ];
    res.json(mockAudits);
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
