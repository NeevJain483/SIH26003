import { db } from "@mindcare-ner/db";

interface CreateMedicationInput {
  medicineName: string;
  dosage?: string;
  frequency?: string;
  scheduledTime?: string;
  startDate?: string;
  endDate?: string;
  instructions?: string;
}

interface UpdateMedicationInput {
  medicineName?: string;
  dosage?: string;
  frequency?: string;
  scheduledTime?: string;
  startDate?: string;
  endDate?: string;
  instructions?: string;
  isActive?: boolean;
}

/**
 * Create a medication for a patient.
 * Only a caregiver assigned to the patient should be allowed
 * to call this service.
 */
export const createMedication = async (
  caregiverId: string,
  patientId: string,
  input: CreateMedicationInput,
) => {
  // Check whether this caregiver is assigned to this patient.
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

  // Make sure the patient actually exists.
  const patient = await db.orm.public.Patient.first({
    id: patientId,
  });

  if (!patient) {
    const error = new Error("Patient not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const medication = await db.orm.public.Medication.create({
    patientId,
    medicineName: input.medicineName,
    dosage: input.dosage ?? null,
    frequency: input.frequency ?? null,
    scheduledTime: input.scheduledTime ?? null,
    startDate: input.startDate ?? null,
    endDate: input.endDate ?? null,
    instructions: input.instructions ?? null,
    isActive: true,
  });

  return medication;
};

/**
 * Get all medications belonging to a patient.
 */
export const getPatientMedications = async (
  caregiverId: string,
  patientId: string,
) => {
  // Verify caregiver-patient relationship.
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

  const medications = await db.orm.public.Medication.where({
    patientId,
  }).all();

  // Active medications first.
  const sortedMedications = [...medications].sort((a, b) => {
    if (a.isActive !== b.isActive) {
      return a.isActive ? -1 : 1;
    }

    return a.medicineName.localeCompare(b.medicineName);
  });

  return {
    patient: {
      id: patient.id,
      patientCode: patient.patientCode,
      displayName: patient.displayName,
    },
    medications: sortedMedications,
  };
};

/**
 * Get one medication belonging to a patient.
 */
export const getMedicationById = async (
  caregiverId: string,
  patientId: string,
  medicationId: string,
) => {
  // Verify caregiver-patient relationship.
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

  const medication = await db.orm.public.Medication.first({
    id: medicationId,
    patientId,
  });

  if (!medication) {
    const error = new Error("Medication not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return medication;
};

/**
 * Update a medication.
 */
export const updateMedication = async (
  caregiverId: string,
  patientId: string,
  medicationId: string,
  input: UpdateMedicationInput,
) => {
  // Verify caregiver-patient relationship.
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

  // Make sure the medication belongs to this patient.
  const medication = await db.orm.public.Medication.first({
    id: medicationId,
    patientId,
  });

  if (!medication) {
    const error = new Error("Medication not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const updatedMedication = await db.orm.public.Medication.where({
    id: medicationId,
  }).update({
    medicineName:
      input.medicineName !== undefined
        ? input.medicineName
        : medication.medicineName,

    dosage: input.dosage !== undefined ? input.dosage : medication.dosage,

    frequency:
      input.frequency !== undefined ? input.frequency : medication.frequency,

    scheduledTime:
      input.scheduledTime !== undefined
        ? input.scheduledTime
        : medication.scheduledTime,

    startDate:
      input.startDate !== undefined ? input.startDate : medication.startDate,

    endDate: input.endDate !== undefined ? input.endDate : medication.endDate,

    instructions:
      input.instructions !== undefined
        ? input.instructions
        : medication.instructions,

    isActive:
      input.isActive !== undefined ? input.isActive : medication.isActive,
  });

  return updatedMedication;
};

/**
 * Deactivate a medication.
 *
 * We do not delete the medication from the database.
 * Instead, we mark it as inactive so the medication history
 * remains available.
 */
export const deactivateMedication = async (
  caregiverId: string,
  patientId: string,
  medicationId: string,
) => {
  // Verify caregiver-patient relationship.
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

  // Make sure medication belongs to patient.
  const medication = await db.orm.public.Medication.first({
    id: medicationId,
    patientId,
  });

  if (!medication) {
    const error = new Error("Medication not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const updatedMedication = await db.orm.public.Medication.where({
    id: medicationId,
  }).update({
    isActive: false,
  });

  return updatedMedication;
};
