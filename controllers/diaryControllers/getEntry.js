import { Diary } from "../../models/diary.js";

const getEntry = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { date } = req.body;
  try {
    const result = await Diary.findOne({ date, owner });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default getEntry;
