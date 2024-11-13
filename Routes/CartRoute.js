const express = require('express');
const router = express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
})
const { insertCart, updateCart, deleteCart, fetchCart } = require('../Controllers/CartController');

router.post('/', insertCart);
router.put('/', updateCart);
router.delete('/', deleteCart);
router.get('/', fetchCart);

router.get('/status/:id', (req, res) => {
    const productId = req.params.id;

    // Query to check if the product is in the cart
    const query = 'SELECT quantity FROM cart WHERE p_id = ?';
    
    db.query(query, [productId], (err, results) => {
        if (err) {
            console.error('Error fetching cart status:', err);
            return res.status(500).json({ message: 'Server error' });
        }

        // If the product is found in the cart
        if (results.length > 0) {
            const cartItem = results[0];
            return res.status(200).json({ inCart: true, quantity: cartItem.quantity });
        } else {
            // If the product is not found in the cart
            return res.status(200).json({ inCart: false });
        }
    });
});

module.exports = router