import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import { registerSchema, loginSchema, subscriptionShema } from "../models/user.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import ctrl from "../controllers/usersControllers/authUser.js"

const authRrouter = express.Router();

authRrouter.post("/register", validateBody(registerSchema), ctrl.registerUser);

authRrouter.post("/login", validateBody(loginSchema), ctrl.loginUser);

authRrouter.get("/current", authenticate, ctrl.getCurrent);

authRrouter.post("/logout", authenticate, ctrl.logoutUser);

authRrouter.patch("/", validateBody(subscriptionShema), authenticate, ctrl.changeSubscription);

authRrouter.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

export { authRrouter };
