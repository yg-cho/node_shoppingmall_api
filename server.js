

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");


const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");

// middle ware 설정
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// router
app.use("/product", productRoute);
app.use("/order", orderRoute);
// app.use("/", (req, res))


const PORT = 5000;
app.listen(PORT, console.log("server started"));