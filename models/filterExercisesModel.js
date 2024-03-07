import { Schema, model } from "mongoose";

const filterExercisesSchema = new Schema({
  filter: {
    type: String,
    requered: true,
  },
  name: {
    type: String,
    requered: true,
  },
  imgURL: {
    type: String,
    requered: true,
  },
});


export const Filter = model("filter", filterExercisesSchema);