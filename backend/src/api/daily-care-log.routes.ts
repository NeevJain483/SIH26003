import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  createDailyCareLogController,
  getDailyCareLogsController,
} from "../controllers/daily-care-log.controller.js";

const dailyCareLog = Router();

dailyCareLog.post(
  "/:patientId/care-logs",
  authenticate,
  requireRole("caregiver"),
  createDailyCareLogController,
);

dailyCareLog.get(
  "/:patientId/care-logs",
  authenticate,
  requireRole("caregiver"),
  getDailyCareLogsController,
);

export default dailyCareLog;
