import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { definePrismaConfig } from '@prisma/cli-engine';
import { defineConfig as ormConfig } from '@prisma/orm-postgres/config';

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../.env"),
  override: true,
});

export default definePrismaConfig({
  orm: ormConfig({
    contract: "./src/prisma/contract.prisma",
    db: {
      connection: process.env['DATABASE_URL']!,
    },
  }),
});
