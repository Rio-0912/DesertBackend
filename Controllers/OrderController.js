const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "root",
    database: "ecommerce"
});

// Function to create an order and transfer cart items to order items
const createOrderForCustomer = (req, res) => {
    // Start a transaction to ensure atomicity of the order creation process
    const { customerId, order_total } = req.body;
    console.log("asd");

    db.beginTransaction((err) => {
        if (err) throw err;

        // Step 1: Create a new order in the `orders` table
        const orderQuery = `
            INSERT INTO orders (customer_id, order_date, order_status, order_total, order_created_date)
            VALUES ("${customerId}", NOW(), 'Pending', ${order_total}, NOW());
        `;

        db.query(orderQuery, (err, orderResult) => {
            if (err) {
                return db.rollback(() => {
                    throw err;
                });
            }

            const orderId = orderResult.insertId;

            // Step 2: Fetch all cart items for the customer
            const cartQuery = `
                SELECT crt_id, p_id AS product_id, quantity 
                FROM cart 
                WHERE crt_id = "${customerId}";
            `;

            db.query(cartQuery, (err, cartItems) => {
                if (err) {
                    return db.rollback(() => {
                        throw err;
                    });
                }

                if (cartItems.length === 0) {
                    return db.rollback(() => {
                        console.log("No items in the cart for this customer.");
                    });
                }

                // Step 3: Insert cart items into the `orderitems` table
                const orderItemsValues = cartItems.map(item => `(${orderId}, ${item.product_id}, ${item.quantity})`).join(", ");
                const orderItemsQuery = `
                    INSERT INTO orderitems (order_id, product_id, quantity)
                    VALUES ${orderItemsValues};
                `;

                db.query(orderItemsQuery, (err) => {
                    if (err) {
                        return db.rollback(() => {
                            throw err;
                        });
                    }

                    // Step 4: Delete cart items for the customer
                    const deleteCartQuery = `
                        DELETE FROM cart 
                        WHERE crt_id = "${customerId}";
                    `;

                    db.query(deleteCartQuery, (err) => {
                        if (err) {
                            return db.rollback(() => {
                                throw err;
                            });
                        }

                        // Commit the transaction after all steps are completed successfully
                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    throw err;
                                });
                            }

                            console.log("Order created successfully and cart cleared.");
                        });
                    });
                });
            });
        });
    });
};



const fetchOrderDetails = (req, res) => {
    const { orderId } = req.params;
    const orderDetailsQuery = `
        SELECT o.order_id, o.order_date, o.order_status, o.order_total, o.order_created_date,
               oi.product_id, oi.quantity, p.pname, p.p_desc, p.p_price, p.p_created_date, p.img
        FROM orders o
        JOIN orderitems oi ON o.order_id = oi.order_id
        JOIN products p ON oi.product_id = p.p_id
        WHERE o.order_id = ${orderId};
    `;

    db.query(orderDetailsQuery, (err, orderDetails) => {
        if (err) {
            console.log("Error fetching order details:", err);
            return res.status(500).json({ error: 'Error fetching order details: ' + err });
        }

        // Calculate total item price for each order item
        const orderDetailsWithPrice = orderDetails.map(item => ({
            ...item,
            item_price: item.quantity * item.p_price
        }));

        return res.status(200).json({ orderDetails: orderDetailsWithPrice });
    });
};


const fetchOrdersForCustomer = (req, res) => {
    const { customerId } = req.params;
    const ordersQuery = `
        SELECT order_id, order_date, order_status, order_total, order_created_date
        FROM orders
        WHERE customer_id = "${customerId}"
        ORDER BY order_created_date DESC;
    `;

    db.query(ordersQuery, (err, orders) => {
        if (err) {
            console.log("Error fetching orders for customer:", err);
            return res.status(500).json({ error: 'Error fetching orders for customer: ' + err });
        }

        // Send the order details back as the response
        return res.status(200).json({ orders });
    });
};

module.exports = { createOrderForCustomer, fetchOrdersForCustomer,fetchOrderDetails };