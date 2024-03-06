import { Filter } from "../../models/filterExercisesModel.js";

export const exercisesFilter = async (req, res) => {
  const { query } = req.params;

  const data = await Filter.find({ filter: { $regex: query, $options: 'i' } });
  res.status(200).json(data);
}