import express from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody, validateParams } from "../helpers/validateBody.js";
import { addProductSchema, exercisesSchema, getByDate } from "../models/diary.js";
import isValidID from "../middlewares/isValidID.js";
import ctrl from "../controllers/diaryControllers/index.js";

const diaryRouter = express.Router();

diaryRouter.post("/product", authenticate,  validateBody(addProductSchema), ctrl.createProduct);
diaryRouter.post("/exercise", authenticate, validateBody(exercisesSchema), ctrl.addExercise);
diaryRouter.delete("/exercise/:id", authenticate, isValidID, ctrl.delDiaryExercises);
diaryRouter.delete("/product/:id", authenticate, isValidID, ctrl.delDiaryProduct);
diaryRouter.get("/entry/:date", validateParams( getByDate),  authenticate, ctrl.getEntry);

export { diaryRouter };
