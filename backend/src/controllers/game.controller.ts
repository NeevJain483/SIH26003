import type { Request, Response, NextFunction } from "express";
import { getActiveGames } from "../services/game.service.js";

export const getGames = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const games = await getActiveGames();

    res.status(200).json({
      success: true,
      message: "Games retrieved successfully",
      data: games,
    });
  } catch (error) {
    next(error);
  }
};
