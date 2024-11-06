

// Wirte fucntions here
const mysql = require("mysql");
const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
})
const fetchProduct = async (req, res) => {
    const sqlQuery = "SELECT * FROM products";

    // console.log(db);
db.query(sqlQuery,(err,data)=>{
    if(err) return res.json(err);
    return res.json(data);
})
}

module.exports = {fetchProduct};