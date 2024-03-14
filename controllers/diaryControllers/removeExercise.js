import { Diary } from "../../models/diary.js";
import { HttpError } from "../../helpers/HttpError.js";

export const delDiaryExercises = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Diary.findOne({ owner, "exercises._id": id });

  if (!result) {
    throw HttpError(404, "Exercise not found in diary");
  }
  const { exercises } = result;

  const findObjectById = (arr, id) => {
    return arr.find((obj) => obj._id.toString() === id.toString());
  };

  const targetObject = findObjectById(exercises, id);

  const calories = targetObject ? targetObject.calories : 0;

  const time = targetObject ? targetObject.time : 0;

  await Diary.findOneAndUpdate(
    {
      owner,
      "exercises._id": id,
    },
    {
      $pull: {
        exercises: { _id: id },
      },
      $inc: { burnedCalories: -calories, sportTime: -time },
    }
  );

  res.status(200).json({ message: "Exercise deleted from diary successfully" });
};
