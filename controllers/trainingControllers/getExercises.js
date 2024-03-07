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

  console.log("Query:", searchQuery);

  const dataUser = await Exercise.find(searchQuery).exec();

  const numberProductsBase = dataUser.length;
  console.log("Number of Products:", numberProductsBase);

  res.status(200).json(dataUser);
};
