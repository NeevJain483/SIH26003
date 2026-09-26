import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  getPatientDashboardController,
} from "../controllers/patient-dashboard.controller.js";

const patientDashboard = Router();

patientDashboard.get(
  "/",
  authenticate,
  requireRole("patient"),
  getPatientDashboardController,
);

export default patientDashboard;