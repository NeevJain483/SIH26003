import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import { getCaregiverPatientDetailsController } from "../controllers/caregiver-patient.controller.js";

const caregiverPatient = Router();

caregiverPatient.get(
  "/:patientId",
  authenticate,
  requireRole("caregiver"),
  getCaregiverPatientDetailsController,
);

export default caregiverPatient;
