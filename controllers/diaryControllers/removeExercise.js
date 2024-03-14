import { Diary } from "../../models/diary.js";
import { HttpError } from "../../helpers/HttpError.js";
import mongoose from "mongoose";

export const delDiaryExercises = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const idToRemove = new mongoose.Types.ObjectId(id);

  const result = await Diary.findOne({ owner, "exercises._id": id });

  if (!result) {
    throw HttpError(404, "id not exist");
  }
  const { exercises } = result;

  const findObjectById = (arr, id) => {
    return arr.find((obj) => obj._id.toString() === id.toString());
  };

  const targetId = id;

  const targetObject = findObjectById(exercises, targetId);

  const calories = targetObject ? targetObject.calories : 0;

  const time = targetObject ? targetObject.time : 0;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "exercises._id": idToRemove,
    },
    {
      $pull: {
        exercises: { _id: idToRemove },
      },
      $inc: { burnedCalories: -calories, sportTime: -time },
    },
    { new: true }
  );

  if (!diaryEntry) throw HttpError(404, "Exercise not found in diary");

  res.status(200).json({ message: "Exercise deleted from diary successfully" });
};
