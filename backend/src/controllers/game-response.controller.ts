import type { Request, Response, NextFunction } from "express";
import { recordGameResponse } from "../services/game-response.service.js";

export const createGameResponse = async (
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

    const sessionIdParam = req.params.sessionId;

    if (!sessionIdParam || Array.isArray(sessionIdParam)) {
      res.status(400).json({
        success: false,
        message: "Invalid session ID",
      });
      return;
    }

    const response = await recordGameResponse(req.user.userId, {
      sessionId: sessionIdParam,
      gameItemId: req.body.gameItemId,
      questionNumber: req.body.questionNumber,
      answerGiven: req.body.answerGiven,
      isCorrect: req.body.isCorrect,
      responseTimeMs: req.body.responseTimeMs,
      hesitationMs: req.body.hesitationMs,
      difficultyAtAttempt: req.body.difficultyAtAttempt,
    });

    res.status(201).json({
      success: true,
      message: "Game response recorded successfully",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};