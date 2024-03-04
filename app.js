import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import { swaggerUi } from "swagger-ui-express";
// import swaggerDocument from "./swagger.json" assert { type: "json" };;
import { authRrouter } from "./routes/auth.js";
dotenv.config();

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const databaseHost = process.env.DB_HOST;
// const {
//   name,
//   version
// } = swaggerDocument;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

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
  .catch((error) => {
    console.error(error.message);
    process.exit(1);
  });
