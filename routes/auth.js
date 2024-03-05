import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import {
  registerSchema,
  loginSchema,
  updateUserSchema,
} from "../models/user.js";
import { authenticate } from "../middlewares/authenticate.js";
import { upload } from "../middlewares/upload.js";
import ctrl from "../controllers/usersControllers/index.js";

const authRrouter = express.Router();

authRrouter.post("/register", validateBody(registerSchema), ctrl.registerUser);

authRrouter.post("/login", validateBody(loginSchema), ctrl.loginUser);

authRrouter.get("/current", authenticate, ctrl.getCurrentUser);

authRrouter.post("/logout", authenticate, ctrl.logoutUser);

authRrouter.patch(
  "/update",
  authenticate,
  validateBody(updateUserSchema),
  ctrl.updateUser
);

// authRrouter.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar)

export { authRrouter };
