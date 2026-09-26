import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createGameSession } from "../controllers/game-session.controller.js";

const gameSession = Router();

gameSession.post("/:gameId/sessions", authenticate, createGameSession);

export default gameSession;
