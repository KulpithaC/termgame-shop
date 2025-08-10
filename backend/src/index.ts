import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Test root route
app.get('/', (_, res) => {
  res.json({ message: 'Backend with Supabase is running 🚀' });
});

app.listen(PORT, () => {
  console.log(`⚡ Server running on http://localhost:${PORT}`);
});
