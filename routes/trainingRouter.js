import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import ctrl from "../controllers/trainingControllers/index.js";
const trainingRouter = express.Router();

trainingRouter.get("/:query", authenticate, ctrl.exerciseAll);
trainingRouter.get("/filter/:query", authenticate, ctrl.exercisesFilter);

export { trainingRouter };
