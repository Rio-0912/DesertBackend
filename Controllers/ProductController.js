const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
});

const fetchProduct = (req, res) => {
    const sqlQuery = "SELECT * FROM products";
    db.query(sqlQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data); // Return data as JSON
    });
};


module.exports = { fetchProduct };
