import { Diary } from "../../models/diary.js";

const addExercise = async (req, res, next) => {
  const {
    date,
    exercises: { exerciseID, time, calories },
  } = req.body;
  console.log(req.body);
  const { _id: owner } = req.user;

  try {
    const isDateExist = await Diary.findOne({ date, owner });

    if (!isDateExist) {
      const result = await Diary.create({ ...req.body, owner });
      res.status(200).json(result);
    } else {
      const result = await Diary.findOneAndUpdate(
        { date, owner },
        { $push: { exercises: { exerciseID, time, calories } } },
        { upsert: true, new: true }
      ).populate("exerciseID");
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

export default addExercise;
