const express = require('express');
const router = express.Router();

const { fetchProduct,fetchOneProduct  } = require('../Controllers/ProductController');

router.get('/', fetchProduct);
router.get('/:id', fetchOneProduct);

module.exports = router