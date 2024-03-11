import {Exercise}  from "../../models/exercisesModel.js";

export const exerciseAll = async (req, res) => {
  const { query } = req.params;

  const searchQuery = {
    $or: [
      { bodyPart: query },
      { target: query },
      { equipment: query },
    ],
  };

  const dataUser = await Exercise.find(searchQuery).exec();

  const numberProductsBase = dataUser.length;

  res.status(200).json(dataUser);
};
