// controllers/itemsController.js
const itemsModel = require("../models/itemsModel");

const validSizes = ["s", "m", "l"];

async function getAllItems() {
  return await itemsModel.readItems();
}

async function getItemById(id) {
  const items = await itemsModel.readItems();
  return items.find((i) => i.id === id);
}

async function createItem(data) {
  if (!data.name || !data.price || !data.size) {
    throw { status: 400, message: "Name, price, and size are required" };
  }
  if (!validSizes.includes(data.size)) {
    throw { status: 400, message: "Size must be s, m, or l" };
  }
  const items = await itemsModel.readItems();
  const newItem = {
    id: itemsModel.generateId(),
    name: data.name,
    price: parseFloat(data.price),
    size: data.size,
  };
  items.push(newItem);
  await itemsModel.writeItems(items);
  return newItem;
}

async function updateItem(id, data) {
  const items = await itemsModel.readItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    throw { status: 404, message: "Item not found" };
  }
  if (data.size && !validSizes.includes(data.size)) {
    throw { status: 400, message: "Size must be s, m, or l" };
  }
  items[idx] = { ...items[idx], ...data, id };
  await itemsModel.writeItems(items);
  return items[idx];
}

async function deleteItem(id) {
  const items = await itemsModel.readItems();
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) {
    throw { status: 404, message: "Item not found" };
  }
  items.splice(idx, 1);
  await itemsModel.writeItems(items);
  return true;
}

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
