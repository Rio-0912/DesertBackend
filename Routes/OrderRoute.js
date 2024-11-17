const express = require('express');
const router = express.Router();

const { createOrderForCustomer } = require('../Controllers/OrderController');

router.post('/', createOrderForCustomer);

module.exports = router