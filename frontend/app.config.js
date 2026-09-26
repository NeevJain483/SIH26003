import path from "node:path";
import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({
  path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env"),
  override: true,
});

export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl: process.env.EXPO_PUBLIC_API_URL?.trim(),
  },
});
