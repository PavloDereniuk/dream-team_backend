import bcrypt from "bcrypt";
import { User } from "../../models/user.js";
import { HttpError } from "../../helpers/HttpError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const tokenKey = process.env.SECRET_KEY;

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const peyload = {
    id: user.id,
  };
  const token = jwt.sign(peyload, tokenKey, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user.id, { token });

  res.json({
    user: {
      name: user.name,
      email: user.email,
      blood: user.blood,
      sex: user.sex,
      height: user.height,
      currentWeight: user.currentWeight,
      desiredWeight: user.desiredWeight,
      levelActivity: user.levelActivity,
      avatarURL: user.avatarURL,
      birthday: user.birthday,
      bmr: user.bmr,
      token,
    },
  });
};
