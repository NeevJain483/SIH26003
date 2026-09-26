import { Router } from "express";

import { authenticate } from "../middleware/auth.middleware.js";
import { requireRole } from "../middleware/role.middleware.js";

import {
  createMemoryJournalEntryController,
  getMemoryJournalEntriesController,
  getMemoryJournalEntryController,
  updateMemoryJournalEntryController,
  deleteMemoryJournalEntryController,
} from "../controllers/memory-journal.controller.js";

const memoryJournal = Router();

memoryJournal.post(
  "/",
  authenticate,
  requireRole("patient"),
  createMemoryJournalEntryController,
);

memoryJournal.get(
  "/",
  authenticate,
  requireRole("patient"),
  getMemoryJournalEntriesController,
);

memoryJournal.get(
  "/:journalId",
  authenticate,
  requireRole("patient"),
  getMemoryJournalEntryController,
);

memoryJournal.patch(
  "/:journalId",
  authenticate,
  requireRole("patient"),
  updateMemoryJournalEntryController,
);

memoryJournal.delete(
  "/:journalId",
  authenticate,
  requireRole("patient"),
  deleteMemoryJournalEntryController,
);

export default memoryJournal;