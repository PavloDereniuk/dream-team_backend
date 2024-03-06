import { Schema, model } from "mongoose";

const exercisesSchema = new Schema({
  bodyPart: {
    type: String,
    requred: true,
  },
  equipment: {
    type: String,
    requred: true,
  },
  gifUrl: {
    type: String,
    requred: true,
  },
  name: {
    type: String,
    requred: true,
  },
  target: {
    type: String,
    requred: true,
  },
  burnedCalories: {
    type: Number,
    requred: true,
  },
  time: {
    type: Number,
    requred: true,
  },
});

export const Exercise = model("exercise", exercisesSchema);
