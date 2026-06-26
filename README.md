# Product Explorer

A backend application built for the CodeVector Backend Internship Task.

It allows users to browse 200,000 products with fast pagination and category filtering.

## Features

- Browse 200,000 products
- Cursor-based pagination
- Category filtering
- Newest products first
- PostgreSQL database
- Bulk product generation
- REST API
- Simple React frontend

## Tech Stack

### Backend

- Node.js
- Express.js
- PostgreSQL
- pg
- dotenv

### Frontend

- React
- Vite
- CSS

## Installation

Clone the repository.

```bash
git clone <repository-url>
```

Go to the project folder.

```bash
cd products-web
```

Install dependencies.

```bash
npm install
```

## Environment Variables

Create a `.env` file.

```env
PORT=5000

DB_HOST=localhost
DB_PORT=5432
DB_NAME=products_db
DB_USER=postgres
DB_PASSWORD=your_password

NODE_ENV=development
```

## Generate Products

```bash
npm run seed
```

This creates the database table and inserts 200,000 products.

## Start the Server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

## API Endpoints

Get Products

```
GET /api/products
```

Filter by Category

```
GET /api/products?category=Electronics
```

Pagination

```
GET /api/products?cursor=cursor_value
```

Get Categories

```
GET /api/categories
```

## Project Structure

```
products-web
│
├── src
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── seed
│   ├── utils
│   ├── db.js
│   └── server.js
│
├── .env
├── package.json
└── README.md
```

## Why Cursor Pagination?

Cursor pagination is faster than offset pagination for large datasets. It also helps provide consistent results while users browse products.

## Future Improvements

- Product search
- Sorting
- Authentication
- Docker support
- Unit testing
- Swagger documentation

## AI Usage

AI was used for planning, code suggestions, debugging, and improving the project structure. The implementation was reviewed, understood, and tested before submission.

## Author

Naresh Bondla
