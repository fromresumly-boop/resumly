import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import emailRouter from './routes/email.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// CORS: allow all origins in production (same-origin), restrict in dev
app.use(cors({
  origin: isProduction ? false : 'http://localhost:5173',
}));

app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api', emailRouter);

// In production: serve the Vite-built React app
if (isProduction) {
  const distPath = path.join(__dirname, '../dist');
  app.use(express.static(distPath));

  // For any non-API route, return the React app (SPA support)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${isProduction ? 'production' : 'development'} mode`);
});
