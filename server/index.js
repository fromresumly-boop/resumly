import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRouter from './routes/email.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration to allow requests from frontend
const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL // Vercel deployment URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      // In development, maybe you want to be more permissive, but this is safe
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.use(express.json({ limit: '50mb' }));

// API routes
app.use('/api', emailRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
