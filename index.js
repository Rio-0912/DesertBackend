const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const ProductRouter = require('./Routes/ProductRouter');

app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
});

app.use('/api/products', ProductRouter);

app.get('/', (req, res) => {
    return res.json("Welcome to the API");
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
