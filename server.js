import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import urlRoutes from './routes/urlRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000', // your frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  })
);app.use(express.json());
app.use('/',urlRoutes);

const PORT = process.env.PORT ||5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})