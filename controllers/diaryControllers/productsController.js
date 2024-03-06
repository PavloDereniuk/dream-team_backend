import { Diary } from "../../models/diary.js";

const createProduct = async (req, res, next) => {
  const {
    date,
    products: { productID, amount, calories },
  } = req.body;

  const { _id: owner } = req.user;

  try {
    const isDateExist = await Diary.findOne({ date, owner });

    if (!isDateExist) {
      const result = await Diary.create({ ...req.body, owner });
      res.status(200).json(result);
    } else {
      const result = await Diary.findOneAndUpdate(
        { date, owner },
        { $push: { products: { productID, amount, calories } } }
      );
      res.status(200).json(result);
    }
  } catch (error) {
    next(error);
  }
};

export default createProduct;
