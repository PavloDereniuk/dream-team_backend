import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../helpers/validateBody.js";
import { addProductSchema, exercisesSchema } from "../models/diary.js";
import ctrl from "../controllers/diaryControllers/index.js";

const diaryRouter = express.Router();

diaryRouter.post(
  "/product",
  authenticate,
  validateBody(addProductSchema),
  ctrl.createProduct
);
diaryRouter.post(
  "/exercise",
  authenticate,
  validateBody(exercisesSchema),
  ctrl.addExercise
);
diaryRouter.delete("/exercise/:id", authenticate, ctrl.delDiaryExercises);
diaryRouter.delete("/product/:id", authenticate, ctrl.delDiaryProduct);
diaryRouter.get("/entry", authenticate, ctrl.getEntry);

export { diaryRouter };
