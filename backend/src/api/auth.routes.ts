import { Router } from "express";

import {
  signup,
  login,
  refresh,
  logout,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, signupSchema } from "@mindcare/common";

const auth = Router();

auth.post("/signup", validate(signupSchema), signup);

auth.post("/login", validate(loginSchema), login);

auth.post("/refresh", refresh);

auth.post("/logout", authenticate, logout);

export default auth;
