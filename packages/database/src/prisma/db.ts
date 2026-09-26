import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import postgres from '@prisma/orm-postgres/runtime';
import type { Contract } from './contract.d.js';
import contractJson from './contract.json' with { type: 'json' };

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../../../.env"),
  override: true,
});

export const db = postgres<Contract>({
  contractJson,
  url: process.env['DATABASE_URL']!,
});