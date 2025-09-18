# Node.js Items API Assignment

## Overview

This project is a simple RESTful API built with Node.js (no frameworks) for managing a collection of items. It demonstrates clean architecture principles by separating concerns into models, controllers, and routes. The API supports CRUD operations and serves static HTML pages for the frontend.

## Features

- **CRUD API** for items (Create, Read, Update, Delete)
- **Data persistence** using a JSON file (`src/items.json`)
- **Modular structure** for maintainability
- **CORS enabled** for easy frontend integration
- **Static HTML serving** for home and 404 pages

## Project Structure

```
nodejs-assignment/
├── package.json
├── README.md
└── src/
    ├── items.json           # Data storage for items
    ├── server.js            # Main server file
    ├── controllers/
    │   └── itemsController.js   # Business logic for items
    ├── models/
    │   └── itemsModel.js        # Data access for items
    ├── routes/
    │   └── itemsRoutes.js       # API route handler
    └── public/
        ├── index.html       # Home page
        └── 404.html         # Not found page
```

## How It Works

- **server.js**: Entry point. Handles HTTP requests, serves HTML, and delegates API requests to routes.
- **routes/itemsRoutes.js**: Handles `/api/items` endpoints, parses requests, and calls controller functions.
- **controllers/itemsController.js**: Contains business logic for validating and manipulating items.
- **models/itemsModel.js**: Handles reading/writing items to the JSON file and ID generation.
- **public/**: Contains static HTML files for the home and error pages.

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)

### Installation

1. Clone the repository or copy the project files.
2. Install dependencies (if any):
   ```sh
   npm install
   ```

### Running the Server

- For development (auto-restart):
  ```sh
  npm run dev
  ```
- For production:
  ```sh
  npm start
  ```
- The server runs on [http://localhost:3000](http://localhost:3000)

## API Endpoints

### 1. Create Item

- **POST** `/api/items`
- **Body Example:**
  ```json
  {
    "name": "Sneakers",
    "price": 49.99,
    "size": "l"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { ...item } }
  ```

### 2. Get All Items

- **GET** `/api/items`
- **Response:**
  ```json
  { "success": true, "data": [ ...items ] }
  ```

### 3. Get Single Item

- **GET** `/api/items/:id`
- **Response:**
  ```json
  { "success": true, "data": { ...item } }
  ```

### 4. Update Item

- **PUT** `/api/items/:id`
- **Body Example:**
  ```json
  {
    "name": "Sneakers Pro",
    "price": 59.99,
    "size": "m"
  }
  ```
- **Response:**
  ```json
  { "success": true, "data": { ...updatedItem } }
  ```

### 5. Delete Item

- **DELETE** `/api/items/:id`
- **Response:**
  ```json
  { "success": true, "message": "Item deleted" }
  ```

## Sample curl Commands

- **Create Item:**
  ```sh
  curl -X POST http://localhost:3000/api/items \
    -H "Content-Type: application/json" \
    -d '{"name":"Sneakers","price":49.99,"size":"l"}'
  ```
- **Get All Items:**
  ```sh
  curl http://localhost:3000/api/items
  ```
- **Get Item by ID:**
  ```sh
  curl http://localhost:3000/api/items/<id>
  ```
- **Update Item:**
  ```sh
  curl -X PUT http://localhost:3000/api/items/<id> \
    -H "Content-Type: application/json" \
    -d '{"name":"Sneakers Pro","price":59.99,"size":"m"}'
  ```
- **Delete Item:**
  ```sh
  curl -X DELETE http://localhost:3000/api/items/<id>
  ```

## Data Validation

- `name`, `price`, and `size` are required for creation.
- `size` must be one of: `s`, `m`, `l`.
- All fields are validated in the controller.

## Error Handling

- Returns clear error messages and status codes for invalid requests, missing fields, or not found items.
- 404 page for invalid HTML routes.

## License

ISC

## Author

Gutu Jirata Imana

---

For any questions or improvements, feel free to open an issue or contact the author.
