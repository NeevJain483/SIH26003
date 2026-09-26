import type { Request, Response, NextFunction } from "express";

import {
  createMedication,
  getPatientMedications,
  getMedicationById,
  updateMedication,
  deactivateMedication,
} from "../services/medication.service.js";

/**
 * Create a medication for a patient.
 */
export const createMedicationController = async (
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

    if (!patientIdParam || Array.isArray(patientIdParam)) {
      res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
      return;
    }

    const medication = await createMedication(
      req.user.userId,
      patientIdParam,
      {
        medicineName: req.body.medicineName,
        dosage: req.body.dosage,
        frequency: req.body.frequency,
        scheduledTime: req.body.scheduledTime,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        instructions: req.body.instructions,
      },
    );

    res.status(201).json({
      success: true,
      message: "Medication created successfully",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get all medications for a patient.
 */
export const getPatientMedicationsController = async (
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

    if (!patientIdParam || Array.isArray(patientIdParam)) {
      res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
      return;
    }

    const result = await getPatientMedications(
      req.user.userId,
      patientIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Medications retrieved successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get a single medication.
 */
export const getMedicationByIdController = async (
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

    const medication = await getMedicationById(
      req.user.userId,
      patientIdParam,
      medicationIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Medication retrieved successfully",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update a medication.
 */
export const updateMedicationController = async (
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

    const medication = await updateMedication(
      req.user.userId,
      patientIdParam,
      medicationIdParam,
      {
        medicineName: req.body.medicineName,
        dosage: req.body.dosage,
        frequency: req.body.frequency,
        scheduledTime: req.body.scheduledTime,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        instructions: req.body.instructions,
        isActive: req.body.isActive,
      },
    );

    res.status(200).json({
      success: true,
      message: "Medication updated successfully",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Deactivate a medication.
 */
export const deactivateMedicationController = async (
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

    const medication = await deactivateMedication(
      req.user.userId,
      patientIdParam,
      medicationIdParam,
    );

    res.status(200).json({
      success: true,
      message: "Medication deactivated successfully",
      data: medication,
    });
  } catch (error) {
    next(error);
  }
};