import { db } from "@mindcare-ner/db";

interface CreateDailyCareLogInput {
  mood?: string;
  hydrationMl?: number;
  mealsCompleted?: number;
  sleepHours?: number;
  notes?: string;
}

export const createDailyCareLog = async (
  caregiverId: string,
  patientId: string,
  input: CreateDailyCareLogInput,
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

  // Verify patient exists.
  const patient = await db.orm.public.Patient.first({
    id: patientId,
  });

  if (!patient) {
    const error = new Error("Patient not found");

    (error as any).statusCode = 404;

    throw error;
  }

  const careLog = await db.orm.public.DailyCareLog.create({
    patientId,
    caregiverId,

    mood: input.mood ?? null,
    hydrationMl: input.hydrationMl ?? null,
    mealsCompleted: input.mealsCompleted ?? null,
    sleepHours:
      input.sleepHours !== undefined ? String(input.sleepHours) : null,
    notes: input.notes ?? null,
  });

  return careLog;
};

export const getDailyCareLogs = async (
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

  // Verify patient exists.
  const patient = await db.orm.public.Patient.first({
    id: patientId,
  });

  if (!patient) {
    const error = new Error("Patient not found");

    (error as any).statusCode = 404;

    throw error;
  }

  const logs = await db.orm.public.DailyCareLog.where({
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
