import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port " + process.env.PORT);
});
