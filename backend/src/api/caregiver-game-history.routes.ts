import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  getCaregiverGameHistoryController,
} from "../controllers/caregiver-game-history.controller.js";

const caregiverGameHistory = Router();

caregiverGameHistory.get(
  "/:patientId/game-history",
  authenticate,
  requireRole("caregiver"),
  getCaregiverGameHistoryController,
);

export default caregiverGameHistory;