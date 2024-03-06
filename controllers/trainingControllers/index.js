import {controllersWrapper}  from "../../helpers/controllersWrapper.js";
import { exerciseAll } from "./getExercises.js";
import {exercisesFilter} from "./getFilterExercises.js"

export default {
  exerciseAll: controllersWrapper(exerciseAll),
  exercisesFilter: controllersWrapper(exercisesFilter),
};