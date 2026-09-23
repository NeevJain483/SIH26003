import http from "node:http";
import app from "./app.js";
import config from "./config.js";

const server = http.createServer(app);

if (process.env.NODE_ENV !== "test") {
  server.listen(config.port, "0.0.0.0", () =>
    console.log(`DoSJE backend listening on http://localhost:${config.port}`),
  );
}
