const mysql = require("mysql");

const db = mysql.createConnection({
    user: "sql12746847",
    host: "sql12.freesqldatabase.com",
    password: "KDMgXd72TQ",
    database: "sql12746847"
});

const showUserDetailsToUser = (req, res) => {

    const {id}  = req.headers;
    console.log(id);
    const sqlQuery = `SELECT * FROM customers WHERE cust_id = "${id}"`;
    
    db.query(sqlQuery, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(result);
    });
    console.log("toi");

}

const adduser = (req, res) => {

    const { name, id, phonenumber, emailid } = req.body;

    const sqlQuery = "INSERT INTO customers (cust_name, cust_id, customer_phone, customer_email) VALUES (?, ?, ?, ?)";
    db.query(sqlQuery, [name, id, phonenumber, emailid], (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: 'User added successfully', result });
    });
};

const updateAdderss = (req, res) => {
    console.log("lkajsdf");

    const { id, address, city, state, country, zip } = req.body;

    const sqlQuery = `UPDATE customers SET cust_address = "${address}", 
    cust_city =  "${city}", 
    cust_state =  '${state}', 
    cust_country =  '${country}', 
    cust_zip =  ${zip} 
    WHERE cust_id = "${id}"`;
    db.query(sqlQuery, [address, city, state, country, zip, id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json(err)
        };
        return res.status(200).json({ message: 'Address updated successfully', result });
    });
};
module.exports = { adduser, updateAdderss, showUserDetailsToUser };
