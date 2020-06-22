

const express = require("express");
const app = express();

// app.use((req,res) => {
//     res.json({
//         message: 'It works!'
//     });
// });

const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");


// router
app.use("/product", productRoute);
app.use("/order", orderRoute);


const PORT = 5000;
app.listen(PORT, console.log("server started"));