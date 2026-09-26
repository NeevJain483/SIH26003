import { Router } from "express";

import { getGames } from "../controllers/game.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const game = Router();

game.get("/", authenticate, getGames);

export default game;
