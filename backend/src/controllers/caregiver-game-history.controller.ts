import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getCaregiverGameHistory,
} from "../services/caregiver-game-history.service.js";

export const getCaregiverGameHistoryController = async (
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

    const patientIdParam = req.params.patientId;

    if (
      !patientIdParam ||
      Array.isArray(patientIdParam)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });

      return;
    }

    const history = await getCaregiverGameHistory(
      req.user.userId,
      patientIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Game history retrieved successfully",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};