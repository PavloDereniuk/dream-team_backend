import { User } from "../../models/user.js";
import { calculateBMR } from "../../helpers/calculateBMR.js";

export const updateUser = async (req, res) => {
  const { id } = req.user;
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (user && id.toString() !== user.id.toString()) {
    throw HttpError(400, "Email is already in use by another user");
  }

  const { currentWeight, height, birthday, sex, levelActivity } = req.body;
  const bmr = calculateBMR(currentWeight, height, birthday, sex, levelActivity);

  const dailyActivity = 110


  const upadateUserDate = await User.findByIdAndUpdate(
    id,
    { ...req.body, bmr, dailyActivity, bodyData: true },
    { new: true }
  );

  res.status(200).json({
    user: {
      name: upadateUserDate.name,
      blood: upadateUserDate.blood,
      sex: upadateUserDate.sex,
      height: upadateUserDate.height,
      currentWeight: upadateUserDate.currentWeight,
      desiredWeight: upadateUserDate.desiredWeight,
      levelActivity: upadateUserDate.levelActivity,
      avatarURL: upadateUserDate.avatarURL,
      birthday: upadateUserDate.birthday,
      dailyActivity: upadateUserDate.dailyActivity,
      bmr: upadateUserDate.bmr,
    },
  });
};
