import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { getPatientDashboard } from "../services/patient-dashboard.service.js";

export const getPatientDashboardController = async (
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

    const dashboard = await getPatientDashboard(
      req.user.userId,
    );

    res.status(200).json({
      success: true,
      message: "Patient dashboard retrieved successfully",
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};