import type {
  Request,
  Response,
  NextFunction,
} from "express";

import { getCaregiverPatientDetails } from "../services/caregiver-patient.service.js";

export const getCaregiverPatientDetailsController = async (
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

    const patient = await getCaregiverPatientDetails(
      req.user.userId,
      patientIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Patient details retrieved successfully",
      data: patient,
    });
  } catch (error) {
    next(error);
  }
};