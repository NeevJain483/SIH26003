import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  createMedicationController,
  getPatientMedicationsController,
  getMedicationByIdController,
  updateMedicationController,
  deactivateMedicationController,
} from "../controllers/medication.controller.js";

const medication = Router();

/**
 * Create a medication for a patient.
 *
 * POST /api/caregivers/patients/:patientId/medications
 */
medication.post(
  "/:patientId/medications",
  authenticate,
  requireRole("caregiver"),
  createMedicationController,
);

/**
 * Get all medications for a patient.
 *
 * GET /api/caregivers/patients/:patientId/medications
 */
medication.get(
  "/:patientId/medications",
  authenticate,
  requireRole("caregiver"),
  getPatientMedicationsController,
);

/**
 * Get a single medication.
 *
 * GET /api/caregivers/patients/:patientId/medications/:medicationId
 */
medication.get(
  "/:patientId/medications/:medicationId",
  authenticate,
  requireRole("caregiver"),
  getMedicationByIdController,
);

/**
 * Update a medication.
 *
 * PATCH /api/caregivers/patients/:patientId/medications/:medicationId
 */
medication.patch(
  "/:patientId/medications/:medicationId",
  authenticate,
  requireRole("caregiver"),
  updateMedicationController,
);

/**
 * Deactivate a medication.
 *
 * DELETE /api/caregivers/patients/:patientId/medications/:medicationId
 */
medication.delete(
  "/:patientId/medications/:medicationId",
  authenticate,
  requireRole("caregiver"),
  deactivateMedicationController,
);

export default medication;