import dotenv from 'dotenv';
dotenv.config();
import * as http from 'http';
import express from "express"

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT;

app.use(express.static('dist'));

server.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});