import { Diary } from "../../models/diary.js";

export const addExercise = async (req, res, next) => {
  const {
    date,
    exercises: { exerciseID, time, calories },
  } = req.body;
  const { _id: owner } = req.user;

  try {
    const isDateExist = await Diary.findOne({ date, owner });

    if (!isDateExist) {
      const result = await Diary.create({ ...req.body, owner });

      await Diary.findOneAndUpdate(
        { date, owner },
        {
          $inc: { burnedCalories: +calories, sportTime: +time },
        },
        { upsert: true, new: true }
      );
      res.status(200).json(result);
    } else {
      const result = await Diary.findOneAndUpdate(
        { date, owner },
        {
          $push: { exercises: { exerciseID, time, calories } },
          $inc: { burnedCalories: +calories, sportTime: +time },
        },
        { upsert: true, new: true }
      );
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};
