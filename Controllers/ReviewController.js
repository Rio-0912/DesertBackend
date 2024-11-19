const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
});

// Create a new review
const createReview = (req, res) => {
    const { cust_id, p_id, comment, ratings } = req.body;
    console.log(p_id);
    
    const query = 'INSERT INTO review (cust_id, p_id, comment, ratings) VALUES (?, ?, ?, ?)';
    db.query(query, [cust_id, p_id, comment, ratings], (err, result) => {
        if (err) {
            console.error('Error creating review:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(201).json({ message: 'Review created successfully', r_id: result.insertId });
    });
};

// Read all reviews
const readReviews = (req, res) => {
    const query = 'SELECT * FROM review';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error reading reviews:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
    });
};

// Read all reviews for a specific product
const readReviewsForProduct = (req, res) => {
    const { p_id } = req.params;

    const query = `
        SELECT review.*, customers.cust_name 
        FROM review 
        JOIN customers ON review.cust_id = customers.cust_id 
        WHERE review.p_id = ?
    `;
    
    db.query(query, [p_id], (err, results) => {
        if (err) {
            console.error('Error reading reviews for product:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json(results);
    });
};

// Update a review
const updateReview = (req, res) => {
    const { r_id, comment, ratings } = req.body;
    
    const query = 'UPDATE review SET comment = ?, ratings = ? WHERE r_id = ?';
    db.query(query, [comment, ratings, r_id], (err, result) => {
        if (err) {
            console.error('Error updating review:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json({ message: 'Review updated successfully' });
    });
};

// Delete a review
const deleteReview = (req, res) => {
    const { r_id } = req.body;
    
    const query = 'DELETE FROM review WHERE r_id = ?';
    db.query(query, [r_id], (err, result) => {
        if (err) {
            console.error('Error deleting review:', err);
            return res.status(500).json({ message: 'Server error' });
        }
        res.status(200).json({ message: 'Review deleted successfully' });
    });
};

module.exports = { createReview, readReviewsForProduct, updateReview, deleteReview };
