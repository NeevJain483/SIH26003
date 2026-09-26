import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  getCaregiverDashboardController,
} from "../controllers/caregiver-dashboard.controller.js";

const caregiverDashboard = Router();

caregiverDashboard.get(
  "/",
  authenticate,
  requireRole("caregiver"),
  getCaregiverDashboardController,
);

export default caregiverDashboard;