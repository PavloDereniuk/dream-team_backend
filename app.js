import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import { authRrouter } from "./routes/auth.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseHost = process.env.DB_HOST;

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

mongoose.set("strictQuery", true);

mongoose
  .connect(databaseHost)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
      console.log("Server running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log("error", error);
    process.exit(1);
  });

// export default app;
