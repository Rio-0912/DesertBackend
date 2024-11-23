const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const ProductRouter = require('./Routes/ProductRouter');
const UserRouter = require('./Routes/UserRouter.js');
const CartRoute = require('./Routes/CartRoute.js');
const OrderRoute = require('./Routes/OrderRoute.js');
const ReviewRoute = require('./Routes/ReviewRoute.js');

app.use(cors());

const db = mysql.createConnection({
    user: "sql12746847",
    host: "sql12.freesqldatabase.com",
    password: "KDMgXd72TQ",
    database: "sql12746847"
});
app.use(express.json());

app.use('/api/cart', CartRoute);
app.use('/api/products', ProductRouter);
app.use('/api/users', UserRouter);
app.use('/api/orders', OrderRoute)
app.use('/api/reviews', ReviewRoute)

app.get('/', (req, res) => {
    return res.json("Welcome to the API");
});

app.listen(8081, () => {
    console.log("Listening on port 8081");
});
