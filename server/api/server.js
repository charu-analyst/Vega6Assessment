import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
const PORT = process.env.PORT || 7000;
const app = express();
import bodyParser from "body-parser";
import "../config/dbConnection.js";
import routes from './route.js'
app.use(express.json());
app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // or specify domains
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
routes(app);
app.listen(PORT, () => {
  console.log(`Secure app is listening @port ${PORT}`);
});
