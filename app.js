import express from "express";
import morgan from "morgan";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert { type: "json" };
import { authRrouter } from "./routes/auth.js";
import { foodRouter } from "./routes/foodRouter.js";
import { trainingRouter } from "./routes/trainingRouter.js";
import { diaryRouter } from "./routes/diaryRouter.js";

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/users", authRrouter);
app.use("/api/exercises", trainingRouter);
app.use("/api/products", foodRouter);
app.use("/api/diary", diaryRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;
