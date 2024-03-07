import { Diary } from "../../models/diary.js";

const getEntry = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { date } = req.body;
};

export default getEntry;
