import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  createMedicationLogController,
  getPatientMedicationLogsController,
  getMedicationLogsController,
  updateMedicationLogStatusController,
} from "../controllers/medication-log.controller.js";

const medicationLog = Router();

/**
 * Create a medication log.
 *
 * POST
 * /api/caregivers/patients/:patientId/medications/:medicationId/logs
 */
medicationLog.post(
  "/:patientId/medications/:medicationId/logs",
  authenticate,
  requireRole("caregiver"),
  createMedicationLogController,
);

/**
 * Get all medication logs for a patient.
 *
 * GET
 * /api/caregivers/patients/:patientId/medication-logs
 */
medicationLog.get(
  "/:patientId/medication-logs",
  authenticate,
  requireRole("caregiver"),
  getPatientMedicationLogsController,
);

medicationLog.get(
  "/:patientId/medications/:medicationId/logs",
  authenticate,
  requireRole("caregiver"),
  getMedicationLogsController,
);

medicationLog.patch(
  "/:patientId/medications/:medicationId/logs/:medicationLogId",
  authenticate,
  requireRole("caregiver"),
  updateMedicationLogStatusController,
);

export default medicationLog;