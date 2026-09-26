import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createMedicationLog,
  getPatientMedicationLogs,
  getMedicationLogs,
  updateMedicationLogStatus,
} from "../services/medication-log.service.js";

/**
 * Create a medication log.
 */
export const createMedicationLogController = async (
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
    const medicationIdParam = req.params.medicationId;

    if (
      !patientIdParam ||
      Array.isArray(patientIdParam) ||
      !medicationIdParam ||
      Array.isArray(medicationIdParam)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid patient ID or medication ID",
      });
      return;
    }

    const medicationLog = await createMedicationLog(
      req.user.userId,
      patientIdParam,
      medicationIdParam,
      {
        status: req.body.status,
      },
    );

    res.status(201).json({
      success: true,
      message: "Medication log created successfully",
      data: medicationLog,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all medication logs for a patient.
 */
export const getPatientMedicationLogsController =
  async (
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

      const result = await getPatientMedicationLogs(
        req.user.userId,
        patientIdParam,
      );

      res.status(200).json({
        success: true,
        message: "Medication logs retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Get logs for a specific medication.
 */
export const getMedicationLogsController = async (
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
    const medicationIdParam = req.params.medicationId;

    if (
      !patientIdParam ||
      Array.isArray(patientIdParam) ||
      !medicationIdParam ||
      Array.isArray(medicationIdParam)
    ) {
      res.status(400).json({
        success: false,
        message: "Invalid patient ID or medication ID",
      });
      return;
    }

    const result = await getMedicationLogs(
      req.user.userId,
      patientIdParam,
      medicationIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Medication logs retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update medication log status.
 */
export const updateMedicationLogStatusController =
  async (
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
      const medicationIdParam = req.params.medicationId;
      const medicationLogIdParam = req.params.medicationLogId;

      if (
        !patientIdParam ||
        Array.isArray(patientIdParam) ||
        !medicationIdParam ||
        Array.isArray(medicationIdParam) ||
        !medicationLogIdParam ||
        Array.isArray(medicationLogIdParam)
      ) {
        res.status(400).json({
          success: false,
          message:
            "Invalid patient ID, medication ID, or medication log ID",
        });
        return;
      }

      const medicationLog =
        await updateMedicationLogStatus(
          req.user.userId,
          patientIdParam,
          medicationIdParam,
          medicationLogIdParam,
          req.body.status,
        );

      res.status(200).json({
        success: true,
        message: "Medication log status updated successfully",
        data: medicationLog,
      });
    } catch (error) {
      next(error);
    }
  };