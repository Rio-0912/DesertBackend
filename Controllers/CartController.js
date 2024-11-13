const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
});

// Insert product into the cart or update quantity if it exists
const insertCart = (req, res) => {
    const { crt_id, p_id } = req.body;

    // First check if product already exists in the cart
    const checkQuery = 'SELECT * FROM cart WHERE crt_id = ? AND p_id = ?';
    db.query(checkQuery, [crt_id, p_id], (err, results) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Something went wrong" });
        }

        if (results.length > 0) {
            // If product exists, just update quantity
            const updateQuery = 'UPDATE cart SET quantity = quantity + 1 WHERE crt_id = ? AND p_id = ?';
            db.query(updateQuery, [crt_id, p_id], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Something went wrong" });
                }
                res.status(200).json({ message: "Cart updated successfully" });
            });
        } else {
            // If product doesn't exist, insert it into the cart
            const insertQuery = 'INSERT INTO cart (crt_id, p_id, quantity) VALUES (?, ?, 1)';
            db.query(insertQuery, [crt_id, p_id], (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(400).json({ message: "Something went wrong" });
                }
                res.status(201).json({ message: "Cart added successfully" });
            });
        }
    });
};

// Update the quantity of a product in the cart
const updateCart = (req, res) => {
    const { crt_id, p_id, quantity } = req.body;

    // Update the quantity of the product in the cart
    const query = 'UPDATE cart SET quantity = ? WHERE crt_id = ? AND p_id = ?';
    db.query(query, [quantity, crt_id, p_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json({ message: "Cart updated successfully" });
    });
};

// Delete a product from the cart
const deleteCart = (req, res) => {
    const { crt_id, p_id } = req.body;

    const query = 'DELETE FROM cart WHERE crt_id = ? AND p_id = ?';
    db.query(query, [crt_id, p_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json({ message: "Cart deleted successfully" });
    });
};

// Fetch all products in the cart for a user
const fetchCart = (req, res) => {
    const { crt_id } = req.headers;
    

    const query = `SELECT * FROM cart WHERE crt_id = "${crt_id}"`;
    
    db.query(query, [crt_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Something went wrong" });
        }
        res.status(200).json(result);
    });
};

module.exports = { insertCart, updateCart, deleteCart, fetchCart };
