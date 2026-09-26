import http from "node:http";
import app from "./app.js";
import config from "./config.js";
import { db } from "@mindcare-ner/db";

const server = http.createServer(app);

if (process.env.NODE_ENV !== "test") {
  server.listen(config.port, "0.0.0.0",async () => {
    await db.connect({url:config.database_url});
    console.log(`DoSJE backend listening on http://localhost:${config.port}`);
  });
}
