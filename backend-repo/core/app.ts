import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import authenticatedRouter from "@/controllers/api";
import publicRouter from "@/controllers/public";
import authMiddleware from "@/middlewares/auth";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use("/api", authMiddleware, authenticatedRouter);
app.use("/", publicRouter);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
