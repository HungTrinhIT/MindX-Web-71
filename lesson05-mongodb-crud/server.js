import 'dotenv/config';
import express from 'express';
import appRouter from './routes/index.js';
import apiLoggerMiddleware from './middlewares/apiLogger.mdw.js';
import { connectToDatabase } from './config/database.js';

const app = express();
const PORT = 3001;

// Initiate database connection
connectToDatabase();

app.use(express.json());
app.use(apiLoggerMiddleware);
app.use('/api/v1', appRouter);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
