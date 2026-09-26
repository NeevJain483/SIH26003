import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { getMe } from "../controllers/users.controller.js";

export const users = Router();

users.get(
  "/me",
  authenticate,
  getMe,
);