import { createProduct } from "./addProductsController.js";
import { addExercise } from "./addExerciseController.js";
import { delDiaryExercises } from "./removeExercise.js";
import { delDiaryProduct } from "./removeProduct.js";
import { getEntry } from "./getEntry.js";
import { controllersWrapper } from "../../helpers/controllersWrapper.js";

export default {
    createProduct: controllersWrapper(createProduct),
    addExercise : controllersWrapper(addExercise),
    delDiaryExercises: controllersWrapper(delDiaryExercises),
    delDiaryProduct: controllersWrapper(delDiaryProduct),
    getEntry: controllersWrapper(getEntry)
  };
