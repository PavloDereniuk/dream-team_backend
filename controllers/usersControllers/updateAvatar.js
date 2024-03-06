import { User } from "../../models/user.js";
import dotenv from "dotenv";
dotenv.config();

export const updateAvatar = async (req, res) => {
  const { id } = req.user;

  const newUser = await User.findByIdAndUpdate(
    id,
    { avatarURL: req.file.path },
    { new: true }
  );

  res.json({
    data: {
      avatarURL: newUser.avatarURL,
    },
  });
  };