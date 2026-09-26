import type { Request, Response, NextFunction } from "express";
import { startGameSession } from "../services/game-session.service.js";

export const createGameSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const gameIdParam = req.params.gameId;

    if (!gameIdParam || Array.isArray(gameIdParam)) {
      res.status(400).json({
        success: false,
        message: "Invalid game ID",
      });
      return;
    }

    const gameId = gameIdParam;

    if (!gameId) {
      res.status(400).json({
        success: false,
        message: "Game ID is required",
      });
      return;
    }

    const session = await startGameSession(req.user.userId, {
      gameId,
      initialDifficulty: req.body.initialDifficulty,
      deviceId: req.body.deviceId,
      moodBefore: req.body.moodBefore,
    });

    res.status(201).json({
      success: true,
      message: "Game session started successfully",
      data: session,
    });
  } catch (error) {
    next(error);
  }
};
