const express = require('express');
const router = express.Router();

const { createOrderForCustomer, fetchOrdersForCustomer, fetchOrderDetails } = require('../Controllers/OrderController');

router.post('/', createOrderForCustomer);
router.get('/det/:orderId', fetchOrderDetails);
router.get('/:customerId', fetchOrdersForCustomer);

module.exports = router