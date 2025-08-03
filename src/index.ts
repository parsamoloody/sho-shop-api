// src/index.ts
import express, { Request, Response } from "express";
import dotenv from 'dotenv'
import authRouter from "./router/auth.route";
import articleRouter from "./router/article.route";
var cors = require('cors')
dotenv.config()
const app = express();
const PORT = 4000;
app.use(cors({ origin: '*' }))
app.use(express.json());
import { connectDB } from './lib/connection';

(async () => {
  await connectDB();
})();

app.use('/api/auth', authRouter);
app.use('/api/post', articleRouter)

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
