const express = require("express");
const router = express.Router();
const productController = require('../controllers/products.js');

//define all the endpoints for the products
router.get("/", [], productController.getAllProducts);

module.exports = router;