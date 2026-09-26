import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createDailyCareLog,
  getDailyCareLogs,
} from "../services/daily-care-log.service.js";

export const createDailyCareLogController = async (
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

    const careLog = await createDailyCareLog(
      req.user.userId,
      patientIdParam,
      {
        mood: req.body.mood,
        hydrationMl: req.body.hydrationMl,
        mealsCompleted: req.body.mealsCompleted,
        sleepHours: req.body.sleepHours,
        notes: req.body.notes,
      },
    );

    res.status(201).json({
      success: true,
      message: "Daily care log created successfully",
      data: careLog,
    });
  } catch (error) {
    next(error);
  }
};

export const getDailyCareLogsController = async (
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

    const result = await getDailyCareLogs(
      req.user.userId,
      patientIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Daily care logs retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};