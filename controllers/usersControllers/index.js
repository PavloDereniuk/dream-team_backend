import { registerUser } from "./registerUser.js";
import { loginUser } from "./loginUser.js";
import { logoutUser } from "./logoutUser.js";
import { getCurrentUser } from "./getCurrentUser.js";
import { updateAvatar } from "./updateAvatar.js";
import { updateUser } from "./updateUser.js";
import { controllersWrapper } from "../../helpers/controllersWrapper.js";


export default {
    registerUser: controllersWrapper(registerUser),
    loginUser: controllersWrapper(loginUser),
    logoutUser: controllersWrapper(logoutUser),
    getCurrentUser: controllersWrapper(getCurrentUser),
    updateUser: controllersWrapper(updateUser),
    updateAvatar: controllersWrapper(updateAvatar),
  };