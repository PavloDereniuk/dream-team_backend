import { User } from "../../models/user.js";

export const logoutUser = async (req, res) => {
    const owner = req.user.id;
    await User.findByIdAndUpdate(owner, { token: "" });
    res.status(204).json();
  };