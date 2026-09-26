import { db } from "@mindcare-ner/db";

interface CreateMemoryJournalInput {
  title?: string;
  content: string;
  mood?: string;
}

interface UpdateMemoryJournalInput {
  title?: string;
  content?: string;
  mood?: string;
}

const getPatient = async (patientId: string) => {
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

export const createMemoryJournalEntry = async (
  patientId: string,
  input: CreateMemoryJournalInput,
) => {
  await getPatient(patientId);

  const journalEntry = await db.orm.public.MemoryJournal.create({
    patientId,
    title: input.title ?? null,
    content: input.content,
    mood: input.mood ?? null,
  });

  return journalEntry;
};

export const getMemoryJournalEntries = async (patientId: string) => {
  const patient = await getPatient(patientId);

  const entries = await db.orm.public.MemoryJournal.where({
    patientId,
  }).all();

  const sortedEntries = [...entries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return {
    patient: {
      id: patient.id,
      patientCode: patient.patientCode,
      displayName: patient.displayName,
    },
    entries: sortedEntries,
  };
};

export const getMemoryJournalEntry = async (
  patientId: string,
  journalId: string,
) => {
  await getPatient(patientId);

  const entry = await db.orm.public.MemoryJournal.first({
    id: journalId,
    patientId,
  });

  if (!entry) {
    const error = new Error("Memory journal entry not found");
    (error as any).statusCode = 404;
    throw error;
  }

  return entry;
};

export const updateMemoryJournalEntry = async (
  patientId: string,
  journalId: string,
  input: UpdateMemoryJournalInput,
) => {
  await getPatient(patientId);

  const entry = await db.orm.public.MemoryJournal.first({
    id: journalId,
    patientId,
  });

  if (!entry) {
    const error = new Error("Memory journal entry not found");
    (error as any).statusCode = 404;
    throw error;
  }

  const updatedEntry = await db.orm.public.MemoryJournal.where({
    id: journalId,
  }).update({
    title: input.title !== undefined ? input.title : entry.title,

    content: input.content !== undefined ? input.content : entry.content,

    mood: input.mood !== undefined ? input.mood : entry.mood,
  });

  return updatedEntry;
};

export const deleteMemoryJournalEntry = async (
  patientId: string,
  journalId: string,
) => {
  await getPatient(patientId);

  const entry = await db.orm.public.MemoryJournal.first({
    id: journalId,
    patientId,
  });

  if (!entry) {
    const error = new Error("Memory journal entry not found");
    (error as any).statusCode = 404;
    throw error;
  }

  await db.orm.public.MemoryJournal.where({ id: journalId }).delete();

  return {
    id: journalId,
  };
};
