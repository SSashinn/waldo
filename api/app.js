import express, { urlencoded } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Importing routes
import userRouter from './routes/user.route.js';
import homeRouter from './routes/home.route.js';

const app = express();
const PORT = 3000;

// To access the req body as json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Setting up cors
app.use(cors());

// connecting to the mongoDB database 
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
};

app.use('/v1/api/', userRouter);
app.use('/v1/api/', homeRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});