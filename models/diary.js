import { Schema, model } from "mongoose";
import Joi from "joi";
import { dateRegex } from "../helpers/patterns.js";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import { parse, isValid, format } from "date-fns";

const addProductSchema = Joi.object({
  date: Joi.string().required().pattern(dateRegex).messages({
    "any.required": "Missing required date field",
    "string.pattern.base": "Invalid date format. Please use the format DD-MM-YYYY.",
  }),
  products: {
    productID: Joi.string().required().messages({
      "any.required": "Missing required productId field",
    }),

    amount: Joi.number().min(1).required().messages({
      "any.required": "Missing required amount field",
      "number.min": "Amount must be a number greater than or equal to 1",
    }),
    calories: Joi.number().min(1).required().messages({
      "any.required": "Missing required calories field",
      "number.min": "Calories must be a number greater than or equal to 1",
    }),
  },
});

const exercisesSchema = Joi.object({
  date: Joi.string().pattern(dateRegex).required().messages({
    "any.required": "Missing required date field",
    "string.pattern.base": "Invalid date format. Please use the format DD-MM-YYYY.",
  }),

  exercises: {
    exerciseID: Joi.string().required().messages({
      "any.required": "Missing required exerciseId field",
    }),
    time: Joi.number().required().messages({
      "any.required": "Missing required time field",
      "number.min": "Time must be a number greater than or equal to 1",
    }),
    calories: Joi.number().min(1).required().messages({
      "any.required": "Missing required calories field",
      "number.min": "Calories must be a number greater than or equal to 1",
    }),
  },
});

const isValidDate = (value) => {
  const parsedDate = parse(value, "dd-MM-yyyy", new Date());
  return isValid(parsedDate) && format(parsedDate, "dd-MM-yyyy") === value;
};

const diarySchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },

    date: {
      type: String,
      required: true,
      validate: {
        validator: isValidDate,
        message: "Invalid date format. Please use the format DD-MM-YYYY.",
      },
    },

    consumedCalories: { type: Number, default: 0 },
    burnedCalories: { type: Number, default: 0 },
    sportTime: { type: Number, default: 0 },

    products: [
      {
        productID: {
          type: Schema.Types.ObjectId,
          ref: "product",
        },
        amount: {
          type: Number,
          required: true,
          min: 1,
        },
        calories: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],

    exercises: [
      {
        exerciseID: {
          type: Schema.Types.ObjectId,
          ref: "exercise",
        },
        time: {
          type: Number,
          required: true,
        },

        calories: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);
diarySchema.post("save", handleMongooseError);
const Diary = model("diary", diarySchema);

const getByDate = Joi.object({
  date: Joi.string().pattern(dateRegex).required().messages({
    "any.required": "Missing required date field",
    "string.pattern.base": "Invalid date format. Please use the format DD-MM-YYYY.",
  }),
});

export { Diary, addProductSchema, exercisesSchema, getByDate };
