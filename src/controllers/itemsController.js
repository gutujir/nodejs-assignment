// This file contains the business logic for handling item operations (CRUD) in the application.

const itemsModel = require("../models/itemsModel"); // Data access layer for items

// Allowed sizes for item validation
const validSizes = ["s", "m", "l"];

// Get all items from the data store.
async function getAllItems() {
  // Fetch all items from the model
  return await itemsModel.readItems();
}

// Get a single item by its ID.
async function getItemById(id) {
  const items = await itemsModel.readItems();
  // Find the item with the matching ID
  return items.find((i) => i.id === id);
}

// Create a new item and save it to the data store.
async function createItem(data) {
  // Validate required fields
  if (!data.name || !data.price || !data.size) {
    throw { status: 400, message: "Name, price, and size are required" };
  }
  // Validate size
  if (!validSizes.includes(data.size)) {
    throw { status: 400, message: "Size must be s, m, or l" };
  }
  const items = await itemsModel.readItems();
  // Construct the new item object
  const newItem = {
    id: itemsModel.generateId(),
    name: data.name,
    price: parseFloat(data.price),
    size: data.size,
  };
  // Add the new item to the list
  items.push(newItem);
  // Save the updated list
  await itemsModel.writeItems(items);
  return newItem;
}

// Update an existing item by its ID.
async function updateItem(id, data) {
  const items = await itemsModel.readItems();
  // Find the index of the item to update
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    throw { status: 404, message: "Item not found" };
  }
  // Validate size if provided
  if (data.size && !validSizes.includes(data.size)) {
    throw { status: 400, message: "Size must be s, m, or l" };
  }
  // Merge the updated data, preserving the ID
  items[idx] = { ...items[idx], ...data, id };
  // Save the updated list
  await itemsModel.writeItems(items);
  return items[idx];
}

// Delete an item by its ID.
async function deleteItem(id) {
  const items = await itemsModel.readItems();
  // Find the index of the item to delete
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    throw { status: 404, message: "Item not found" };
  }
  // Remove the item from the list
  items.splice(idx, 1);
  // Save the updated list
  await itemsModel.writeItems(items);
  return true;
}

// Export controller functions for use in routes
module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
