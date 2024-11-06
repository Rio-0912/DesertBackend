const express = require('express');
const router = express.Router();

const { fetchProduct } = require('../Controllers/ProductController');

router.get('/', fetchProduct);

module.exports = router