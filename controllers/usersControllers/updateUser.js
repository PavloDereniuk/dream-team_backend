import { User } from "../../models/user.js";
import { calculateBMR } from "../../helpers/calculateBMR.js";

export const updateUser = async (req, res) => {
  const user = req.user;
  const updateDate = req.body;
  const { currentWeight, height, birthday, sex, levelActivity } = updateDate;
  const bmr = calculateBMR(currentWeight, height, birthday, sex, levelActivity);

  const upadateUserDate = await User.findByIdAndUpdate(user.id, { ...updateDate, dailyActivity: 110, bmr });

  res.status(200).json({
    upadateUserDate,
  });
};
