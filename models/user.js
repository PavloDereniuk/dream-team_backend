import { Schema, model } from "mongoose";
import { handleMongooseError } from "../helpers/handleMongooseError.js";
import Joi from "joi";
import { emailRegex } from "../helpers/patterns.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name for user"],
    },
    email: {
      type: String,
      match: emailRegex,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
      minlength: 6,
    },
    height: {
      type: Number,
      default: 0,
    },
    currentWeight: {
      type: Number,
      default: 0,
    },
    desiredWeight: {
      type: Number,
      default: 0,
    },
    birthday: {
      type: String,
      validate: {
        validator: function (birthday) {
          return (
            isBefore(birthday, new Date()) &&
            differenceInYears(new Date(), birthday) >= 18
          );
        },
        message: "The user must be older than 18 years.",
      },
    },
    blood: {
      type: Number,
      enum: [1, 2, 3, 4],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    levelActivity: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String,
      default: null,
    },
    bmr: {
      type: Number,
      default: 0,
    },
    dailyActivity: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false, timestamps: true }
);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "any.required": "email field is required.",
    "string.emailRegex.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.base": "The email must be a string.",
    "any.required": "email field is required.",
    "string.emailRegex.base": "The email must be in format test@gmail.com.",
  }),
  password: Joi.string().min(6).required(),
});

const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  height: Joi.number().min(150).required(),
  currentWeight: Joi.number().min(35).required(),
  desiredWeight: Joi.number().min(35).required(),
  birthday: Joi.date().required(),
  blood: Joi.number().valid(1, 2, 3, 4).required(),
  sex: Joi.string().valid("male", "female").required(),
  levelActivity: Joi.number().valid(1, 2, 3, 4, 5).required(),
});

userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

export { User, registerSchema, loginSchema, updateUserSchema };
