import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUrl = process.env.MONGODB_URL;

mongoose
  .connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
