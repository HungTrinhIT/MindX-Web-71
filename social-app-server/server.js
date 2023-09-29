import 'dotenv/config.js';
import express from 'express';
import appRouter from './routes/index.js';
import apiLoggerMiddleware from './middlewares/apiLogger.mdw.js';
import { connectToDatabase } from './config/database.js';
import handleErrorMiddleware from './middlewares/handleError.mdw.js';

import cors from 'cors';

const whitelist = [
  'https://social-app-server-p5cm.onrender.com',
  'https://social-app-client-a2fz.onrender.com',
  'http://localhost:8080',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }

    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'PUT,PATCH,GET,DELETE,UPDATE',
};

const app = express();
const PORT = process.env.PORT;

// 1. Initiate database connection
connectToDatabase();

// 2. Define middlewares
app.use(express.json());
app.use(cors(corsOptions));
app.use(apiLoggerMiddleware);

// 3. Define routes
app.use('/api/v1', appRouter);

// 4. Handle error
app.use(handleErrorMiddleware);

// 5. Run server
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
