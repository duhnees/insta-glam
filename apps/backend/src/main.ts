import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import AuthRouter from './routes/account';


// read environment variables from .env file
dotenv.config();
const PORT = process.env.PORT ?? 8000;

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/express';

const SECRET=process.env.SECRET ?? "secret";


mongoose.connect(MONGODB_URI, {});

const app = express();
app.use(express.json());

app.use(
  cookieSession({
    name: 'session',
    secret: SECRET,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  }),
);

//from class demo
app.use((req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(req.session);
  next();
});

app.use('/account', AuthRouter);


// listen
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Now listening on port ${PORT}.`);
});
