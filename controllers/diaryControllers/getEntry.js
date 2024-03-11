import { Diary } from "../../models/diary.js";

export const getEntry = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { date } = req.params;
  try {
    const result = await Diary.findOne({ date, owner }).populate("products.productID").populate("exercises.exerciseID");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
