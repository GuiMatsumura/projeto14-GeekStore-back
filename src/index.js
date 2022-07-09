import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

app.use(authRouter);

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server running on port " + process.env.PORT);
});
