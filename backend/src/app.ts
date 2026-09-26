import express from "express";
import helmet from "helmet";
import cors from "cors";
import { db } from "@mindcare-ner/db";

import auth from "./api/auth.routes.js";
import { users } from "./api/users.routes.js";
import { notFound } from "./middleware/notfound.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import patient from "./api/patient.routes.js";
import game from "./api/game.routes.js";
import gameSession from "./api/game-session.routes.js";
import gameResponse from "./api/game-response.routes.js";
import caregiverDashboard from "./api/caregiver-dashboard.routes.js";
import caregiverPatient from "./api/caregiver-patient.routes.js";
import caregiverGameHistory from "./api/caregiver-game-history.routes.js";
import dailyCareLog from "./api/daily-care-log.routes.js";
import medication from "./api/medication.routes.js";
import medicationLog from "./api/medication-log.routes.js";
import memoryJournal from "./api/memory-journal.routes.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: true,
  }),
);

app.get("/health", async (req, res) => {
  let dbStatus = false;
  try {
    await db.orm.public.User.first();
    dbStatus = true;
  } catch (error) {
    console.log(error);
  }
  res.json({
    msg: "backend is healthy",
    dbStatus: dbStatus ? "OK" : "NOT OK",
  });
});

app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/patients", patient);
app.use("/api/games", game);
app.use("/api/games", gameSession);
app.use("/api/game-sessions", gameResponse);
app.use("/api/caregivers/dashboard", caregiverDashboard);
app.use("/api/caregivers/patients", caregiverPatient);
app.use("/api/caregivers/patients", caregiverGameHistory);
app.use("/api/caregivers/patients", dailyCareLog);
app.use("/api/caregivers/patients", medication);
app.use("/api/caregivers/patients", medicationLog);
app.use("/api/patients/journal", memoryJournal);

app.use(notFound);
app.use(errorHandler);

export default app;
