const mysql = require("mysql");

const db = mysql.createConnection({
    user: "sql12746847",
    host: "sql12.freesqldatabase.com",
    password: "KDMgXd72TQ",
    database: "sql12746847"
});

const fetchProduct = (req, res) => {
    const sqlQuery = "SELECT * FROM products";
    db.query(sqlQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data); // Return data as JSON
    });
};

const fetchOneProduct = (req, res) => {
    const { id } = req.params;
    
    const sqlQuery = `SELECT * FROM products WHERE p_id = "${id}"`;
    db.query(sqlQuery, (err, data) => {
        if (err) return res.status(500).json(err);
        if(data.length === 0) return res.status(404).json({ message: "Product Not Found" });
        return res.status(200).json(data[0]); // Return data as JSON
    });
};

module.exports = { fetchProduct,fetchOneProduct };
