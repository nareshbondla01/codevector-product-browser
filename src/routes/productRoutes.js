const express = require("express");

const {
    getProducts,
    getCategories,
} = require("../controllers/productController");

const router = express.Router();

// Get all products with cursor pagination
router.get("/products", getProducts);

// Get all unique categories
router.get("/categories", getCategories);

module.exports = router;