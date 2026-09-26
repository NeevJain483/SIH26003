import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  getCaregiverDashboard,
} from "../services/caregiver-dashboard.service.js";

export const getCaregiverDashboardController = async (
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

    const dashboard =
      await getCaregiverDashboard(
        req.user.userId,
      );

    res.status(200).json({
      success: true,
      message:
        "Caregiver dashboard retrieved successfully",
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};