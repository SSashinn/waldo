import express, { urlencoded } from 'express';
import userRouter from './routes/user.route.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 3000;

// To access the req body as json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connecting to the mongoDB database 
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGO_URL;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
};

app.use('/v1/api/', userRouter);


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