import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/express';

mongoose.connect(MONGODB_URI, {});

const app = express();
app.use(express.json());


// define root route
app.get('/api/hello', (_, res) => {
  res.json({ message: 'Hello, frontend!' });
});

// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
