import { db } from "@mindcare-ner/db";

interface CreateMedicationLogInput {
  status: string;
}

/**
 * Verify that a caregiver is assigned to the patient.
 */
const verifyCaregiverPatient = async (
  caregiverId: string,
  patientId: string,
) => {
  const assignment = await db.orm.public.CaregiverPatient.first({
    caregiverId,
    patientId,
  });

  if (!assignment) {
    const error = new Error(
      "Patient not found or patient is not assigned to this caregiver",
    );
    (error as any).statusCode = 404;
    throw error;
  }

  const patient = await db.orm.public.Patient.first({
    id: patientId,
  });

  if (!patient) {
    const error = new Error("Patient not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return patient;
};

/**
 * Verify that a medication belongs to the patient.
 */
const getMedicationForPatient = async (
  patientId: string,
  medicationId: string,
) => {
  const medication = await db.orm.public.Medication.first({
    id: medicationId,
    patientId,
  });

  if (!medication) {
    const error = new Error("Medication not found for this patient");
    (error as any).statusCode = 404;
    throw error;
  }

  return medication;
};

/**
 * Create a medication log.
 *
 * Example statuses:
 * - taken
 * - missed
 * - pending
 */
export const createMedicationLog = async (
  caregiverId: string,
  patientId: string,
  medicationId: string,
  input: CreateMedicationLogInput,
) => {
  await verifyCaregiverPatient(caregiverId, patientId);

  await getMedicationForPatient(patientId, medicationId);

  const medicationLog = await db.orm.public.MedicationLog.create({
    medicationId,
    patientId,
    status: input.status,
  });

  return medicationLog;
};

/**
 * Get all medication logs for a patient.
 */
export const getPatientMedicationLogs = async (
  caregiverId: string,
  patientId: string,
) => {
  const patient = await verifyCaregiverPatient(caregiverId, patientId);

  const logs = await db.orm.public.MedicationLog.where({
    patientId,
  }).all();

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    patient: {
      id: patient.id,
      patientCode: patient.patientCode,
      displayName: patient.displayName,
    },
    logs: sortedLogs,
  };
};

/**
 * Get logs for a specific medication.
 */
export const getMedicationLogs = async (
  caregiverId: string,
  patientId: string,
  medicationId: string,
) => {
  await verifyCaregiverPatient(caregiverId, patientId);

  await getMedicationForPatient(patientId, medicationId);

  const logs = await db.orm.public.MedicationLog.where({
    patientId,
    medicationId,
  }).all();

  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    medicationId,
    logs: sortedLogs,
  };
};

/**
 * Update the status of a medication log.
 */
export const updateMedicationLogStatus = async (
  caregiverId: string,
  patientId: string,
  medicationId: string,
  medicationLogId: string,
  status: string,
) => {
  await verifyCaregiverPatient(caregiverId, patientId);

  await getMedicationForPatient(patientId, medicationId);

  const medicationLog = await db.orm.public.MedicationLog.first({
    id: medicationLogId,
    patientId,
    medicationId,
  });

  if (!medicationLog) {
    const error = new Error("Medication log not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const updatedLog = await db.orm.public.MedicationLog.where({
    id: medicationLogId,
  }).update({
    status,
  });

  return updatedLog;
};
