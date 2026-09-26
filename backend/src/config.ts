import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../.env"),
  override: true,
});

const jwtSecret = process.env.JWT_SECRET;
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in environment variables");
}

if (!jwtRefreshSecret) {
  throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
}

const config = {
  port: Number(process.env.PORT) || 4000,
  database_url: process.env.DATABASE_URL || "",
  frontend_url: process.env.FRONTEND_URL?.trim() || undefined,
  hash_rounds: Number(process.env.HASH_ROUNDS) || 5,
  jwt_secret: jwtSecret,
  jwt_refresh_secret: jwtRefreshSecret,
};

export default config;
