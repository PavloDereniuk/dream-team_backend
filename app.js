import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { authRrouter } from "./routes/auth.js";
dotenv.config();

const databaseHost = process.env.DB_HOST;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"))

app.use("/api/users", authRrouter);
// app.use("/api/exercises", *******);
// app.use("/api/filters", *******);
// app.use("/api/products", *******);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

mongoose
  .connect(databaseHost)
  .then(
    app.listen(3000, () => {
      console.log("Database connection successful");
    })
  )
  .catch(() => {
    console.error(err.message);
    process.exit(1);
  });