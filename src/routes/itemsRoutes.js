// routes/itemsRoutes.js
const url = require("url");
const itemsController = require("../controllers/itemsController");

async function itemsRoutes(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathParts = parsedUrl.pathname.split("/").filter((part) => part !== "");
  const itemId = pathParts[2];

  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  try {
    let body = "";
    switch (req.method) {
      case "GET":
        if (itemId) {
          const item = await itemsController.getItemById(itemId);
          if (item) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, data: item }));
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({ success: false, error: "Item not found" })
            );
          }
        } else {
          const items = await itemsController.getAllItems();
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, data: items }));
        }
        break;
      case "POST":
        body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          try {
            const data = JSON.parse(body);
            const newItem = await itemsController.createItem(data);
            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, data: newItem }));
          } catch (err) {
            res.writeHead(err.status || 400, {
              "Content-Type": "application/json",
            });
            res.end(
              JSON.stringify({
                success: false,
                error: err.message || "Invalid JSON",
              })
            );
          }
        });
        break;
      case "PUT":
        if (!itemId) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ success: false, error: "Item ID required" })
          );
          return;
        }
        body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });
        req.on("end", async () => {
          try {
            const data = JSON.parse(body);
            const updatedItem = await itemsController.updateItem(itemId, data);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true, data: updatedItem }));
          } catch (err) {
            res.writeHead(err.status || 400, {
              "Content-Type": "application/json",
            });
            res.end(
              JSON.stringify({
                success: false,
                error: err.message || "Invalid JSON",
              })
            );
          }
        });
        break;
      case "DELETE":
        if (!itemId) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ success: false, error: "Item ID required" })
          );
          return;
        }
        try {
          await itemsController.deleteItem(itemId);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, message: "Item deleted" }));
        } catch (err) {
          res.writeHead(err.status || 404, {
            "Content-Type": "application/json",
          });
          res.end(JSON.stringify({ success: false, error: err.message }));
        }
        break;
      default:
        res.writeHead(405, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ success: false, error: "Method not allowed" })
        );
    }
  } catch (error) {
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "Internal server error" }));
  }
}

module.exports = itemsRoutes;
