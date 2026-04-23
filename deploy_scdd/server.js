// dan-rc-data-scdd static site on Cloud Run.
//
// Serves index.html + data/**/*.xlsx for the SCDD-facing RC data dashboard.
// No backend, no secrets, no API calls — just static file hosting.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

app.set("trust proxy", true);

app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "dan-rc-data-scdd", timestamp: new Date().toISOString() });
});

app.use(express.static(__dirname, {
  extensions: ["html"],
  index: "index.html",
  setHeaders: (res, filePath) => {
    // xlsx files: force download rather than inline preview (helps state
    // browsers that strip unknown inline content).
    if (filePath.endsWith(".xlsx")) {
      res.setHeader("Content-Disposition", "attachment");
    }
  },
}));

const server = app.listen(PORT, () => {
  console.log(`dan-rc-data-scdd listening on port ${PORT}`);
});

server.requestTimeout = 60 * 1000;
server.headersTimeout = 65 * 1000;
server.keepAliveTimeout = 30 * 1000;
