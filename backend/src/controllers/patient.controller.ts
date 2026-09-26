import type { Request, Response, NextFunction } from "express";
import { db } from "@mindcare-ner/db";

export const getPatientProfile = async (
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

    const patient = await db.orm.public.Patient.first({
      userId: req.user.userId,
    });

    if (!patient) {
      res.status(404).json({
        success: false,
        message: "Patient profile not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Patient profile retrieved successfully",
      data: {
        patientId: patient.id,
        userId: patient.userId,
        patientCode: patient.patientCode,
        displayName: patient.displayName,
        primaryLanguage: patient.primaryLanguage,
      },
    });
  } catch (error) {
    next(error);
  }
};
