import { Diary } from "../../models/diary.js";
import { HttpError } from "../../helpers/HttpError.js";
import mongoose from "mongoose";

const delDiaryProduct = async (req, res) => {
  const { _id: owner } = req.user;
  console.log("🚀 ~ delDiaryExercises ~ owner:", owner);
  const { id } = req.params;
  const idToRemove = new mongoose.Types.ObjectId(id);
  console.log("🚀 ~ delDiaryExercises ~ idToRemove:", idToRemove);
  console.log("🚀 ~ delDiaryExercises ~ id:", id);

  const diaryEntry = await Diary.findOneAndUpdate(
    {
      owner,
      "products._id": idToRemove,
    },
    {
      $pull: {
        products: { _id: idToRemove },
      },
    },
    { new: true }
  );

  if (!diaryEntry) throw HttpError(404, "Product not found in diary");

  res.status(200).json({ message: "Product deleted from diary successfully" });
};

export default delDiaryProduct;
