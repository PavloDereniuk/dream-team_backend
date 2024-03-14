import { Diary } from "../../models/diary.js";
import { HttpError } from "../../helpers/HttpError.js";

export const delDiaryProduct = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Diary.findOne({ owner, "products._id": id });

  if (!result) {
    throw HttpError(404, "Product not found in diary");
  }
  const { products } = result;

  const findObjectById = (arr, id) => {
    return arr.find((obj) => obj._id.toString() === id.toString());
  };

  const targetObject = findObjectById(products, id);

  const calories = targetObject ? targetObject.calories : 0;

  await Diary.findOneAndUpdate(
    {
      owner,
      "products._id": id,
    },
    {
      $inc: { consumedCalories: -calories },
      $pull: {
        products: { _id: id },
      },
    }
  );

  res.status(200).json({ message: "Product deleted from diary successfully" });
};
