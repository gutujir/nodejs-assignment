// server.js

const http = require("http");
const fs = require("fs").promises;
const path = require("path");
const url = require("url");

const PORT = 3000;
const itemsModel = require("./models/itemsModel");
const itemsRoutes = require("./routes/itemsRoutes");

// Serve HTML files
async function serveHtmlFile(req, res, filePath) {
  try {
    const fullPath = path.join(__dirname, "public", filePath);
    const data = await fs.readFile(fullPath, "utf8");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  } catch (error) {
    // Serve 404 page for any HTML file that doesn't exist
    try {
      const notFoundPath = path.join(__dirname, "public", "404.html");
      const data = await fs.readFile(notFoundPath, "utf8");
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(data);
    } catch (error) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  }
}

// Main request handler
async function requestHandler(req, res) {
  const parsedUrl = url.parse(req.url, true);

  // Serve HTML files
  if (parsedUrl.pathname === "/index.html" || parsedUrl.pathname === "/") {
    await serveHtmlFile(req, res, "index.html");
  }
  // Handle API requests
  else if (parsedUrl.pathname.startsWith("/api/items")) {
    await itemsRoutes(req, res);
  }
  // Handle requests for other HTML files (return 404)
  else if (parsedUrl.pathname.endsWith(".html")) {
    await serveHtmlFile(req, res, "404.html");
  }
  // Handle other requests
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}

// Create server
const server = http.createServer((req, res) => {
  requestHandler(req, res).catch((error) => {
    console.error("Server error:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Internal server error" }));
  });
});

// Initialize and start server
async function startServer() {
  await itemsModel.initializeItemsFile();
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
  });
}

startServer();
