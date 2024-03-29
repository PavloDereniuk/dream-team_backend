import { Diary } from "../../models/diary.js";

export const createProduct = async (req, res, next) => {
  const {
    date,
    products: { productID, amount, calories },
  } = req.body;

  const { _id: owner } = req.user;

  try {
    const isDateExist = await Diary.findOne({ date, owner });

    if (!isDateExist) {
      const result = await Diary.create({ ...req.body, owner });

      await Diary.findOneAndUpdate(
        { date, owner },
        {
          $inc: { consumedCalories: +calories },
        },
        { upsert: true, new: true }
      );

      res.status(200).json(result);
    } else {
      const result = await Diary.findOneAndUpdate(
        { date, owner },
        {
          $push: { products: { productID, amount, calories } },
          $inc: { consumedCalories: +calories },
        },
        { new: true, upsert: true }
      ).populate("products.productID");
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};
