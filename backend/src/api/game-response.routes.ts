import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { createGameResponse } from "../controllers/game-response.controller.js";

const gameResponse = Router();

gameResponse.post(
  "/:sessionId/responses",
  authenticate,
  createGameResponse,
);

export default gameResponse;