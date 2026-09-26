import { Router } from "express";

import { getPatientProfile } from "../controllers/patient.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

const patient = Router();

patient.get(
  "/profile",
  authenticate,
  requireRole("patient"),
  getPatientProfile,
);

export default patient;
