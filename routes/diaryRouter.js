import express from "express";
import createProduct from "../controllers/diaryControllers/productsController.js";
import addExercise from "../controllers/diaryControllers/addExerciseController.js";
import { authenticate } from "../middlewares/authenticate.js";
import { validateBody } from "../helpers/validateBody.js";
import { addProductSchema, exercisesSchema } from "../models/diary.js";
import delDiaryExercises from "../controllers/diaryControllers/removeExercise.js";
import delDiaryProduct from "../controllers/diaryControllers/removeProduct.js";

const diaryRouter = express.Router();

diaryRouter.post("/product", authenticate, validateBody(addProductSchema), createProduct);
diaryRouter.post("/exercise", authenticate, validateBody(exercisesSchema), addExercise);
diaryRouter.delete("/exercise/:id", authenticate, delDiaryExercises);
diaryRouter.delete("/product/:id", authenticate, delDiaryProduct);

export default diaryRouter;
