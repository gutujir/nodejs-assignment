// models/itemsModel.js
const fs = require("fs").promises;
const path = require("path");

const ITEMS_FILE = path.join(__dirname, "../items.json");

async function initializeItemsFile() {
  try {
    await fs.access(ITEMS_FILE);
  } catch (error) {
    await fs.writeFile(ITEMS_FILE, JSON.stringify([]));
  }
}

async function readItems() {
  try {
    const data = await fs.readFile(ITEMS_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading items:", error);
    return [];
  }
}

async function writeItems(items) {
  try {
    await fs.writeFile(ITEMS_FILE, JSON.stringify(items, null, 2));
  } catch (error) {
    console.error("Error writing items:", error);
    throw error;
  }
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

module.exports = {
  initializeItemsFile,
  readItems,
  writeItems,
  generateId,
};
