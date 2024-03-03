import bcrypt from "bcrypt";
import { User } from "../../models/user.js";
import { HttpError } from "../../helpers/HttpError.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";
dotenv.config();

// const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const tokenKey = process.env.SECRET_KEY;

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
  });

  const peyload = {
    id: newUser.id,
  };

  const token = jwt.sign(peyload, tokenKey, { expiresIn: "23h" });
  newUser.token = token;

  await User.findByIdAndUpdate(newUser.id, { token });

  res.status(201).json({
    user: {
      name: newUser.name,
      email: newUser.email,
      token: newUser.token,
    },
  });
};
