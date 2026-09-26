import type {
  Request,
  Response,
  NextFunction,
} from "express";

import {
  createMemoryJournalEntry,
  getMemoryJournalEntries,
  getMemoryJournalEntry,
  updateMemoryJournalEntry,
  deleteMemoryJournalEntry,
} from "../services/memory-journal.service.js";

export const createMemoryJournalEntryController =
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      if (req.user.role !== "patient") {
        res.status(403).json({
          success: false,
          message: "Only patients can create memory journal entries",
        });
        return;
      }

      const entry = await createMemoryJournalEntry(
        req.user.userId,
        {
          title: req.body.title,
          content: req.body.content,
          mood: req.body.mood,
        },
      );

      res.status(201).json({
        success: true,
        message: "Memory journal entry created successfully",
        data: entry,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Get all journal entries for the logged-in patient.
 */
export const getMemoryJournalEntriesController =
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      if (req.user.role !== "patient") {
        res.status(403).json({
          success: false,
          message: "Only patients can access their memory journal",
        });
        return;
      }

      const result = await getMemoryJournalEntries(
        req.user.userId,
      );

      res.status(200).json({
        success: true,
        message: "Memory journal entries retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Get one journal entry.
 */
export const getMemoryJournalEntryController =
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      if (req.user.role !== "patient") {
        res.status(403).json({
          success: false,
          message: "Only patients can access their memory journal",
        });
        return;
      }

      const journalIdParam = req.params.journalId;

      if (
        !journalIdParam ||
        Array.isArray(journalIdParam)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid journal ID",
        });
        return;
      }

      const entry = await getMemoryJournalEntry(
        req.user.userId,
        journalIdParam,
      );

      res.status(200).json({
        success: true,
        message: "Memory journal entry retrieved successfully",
        data: entry,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Update a journal entry.
 */
export const updateMemoryJournalEntryController =
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      if (req.user.role !== "patient") {
        res.status(403).json({
          success: false,
          message: "Only patients can update their memory journal",
        });
        return;
      }

      const journalIdParam = req.params.journalId;

      if (
        !journalIdParam ||
        Array.isArray(journalIdParam)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid journal ID",
        });
        return;
      }

      const entry = await updateMemoryJournalEntry(
        req.user.userId,
        journalIdParam,
        {
          title: req.body.title,
          content: req.body.content,
          mood: req.body.mood,
        },
      );

      res.status(200).json({
        success: true,
        message: "Memory journal entry updated successfully",
        data: entry,
      });
    } catch (error) {
      next(error);
    }
  };

/**
 * Delete a journal entry.
 */
export const deleteMemoryJournalEntryController =
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Authentication required",
        });
        return;
      }

      if (req.user.role !== "patient") {
        res.status(403).json({
          success: false,
          message: "Only patients can delete their memory journal",
        });
        return;
      }

      const journalIdParam = req.params.journalId;

      if (
        !journalIdParam ||
        Array.isArray(journalIdParam)
      ) {
        res.status(400).json({
          success: false,
          message: "Invalid journal ID",
        });
        return;
      }

      const result = await deleteMemoryJournalEntry(
        req.user.userId,
        journalIdParam,
      );

      res.status(200).json({
        success: true,
        message: "Memory journal entry deleted successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };