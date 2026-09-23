import express from "express";
import helmet from "helmet";
import { auth } from "./api.js";

const app = express();

app.use(helmet());
app.use(express.json());

app.use("/api", auth);

export default app;
