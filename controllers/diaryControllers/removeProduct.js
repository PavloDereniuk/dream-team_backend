import { Diary } from "../../models/diary.js";
import { HttpError } from "../../helpers/HttpError.js";
import mongoose from "mongoose";

export const delDiaryProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const idToRemove = new mongoose.Types.ObjectId(id);

  const result = await Diary.findOne({ owner, "products._id": id });

  if (!result) {
    throw HttpError(404, "id not exist");
  }
  const { products } = result;

  const findObjectById = (arr, id) => {
    return arr.find((obj) => obj._id.toString() === id.toString());
  };

  const targetId = id;

  const targetObject = findObjectById(products, targetId);

  const calories = targetObject ? targetObject.calories : 0;

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "products._id": idToRemove,
    },
    {
      $inc: { consumedCalories: -calories },
      $pull: {
        products: { _id: idToRemove },
      },
    },
    { new: true }
  );

  if (!diaryEntry) throw HttpError(404, "Product not found in diary");

  res.status(200).json({ message: "Product deleted from diary successfully" });
};
