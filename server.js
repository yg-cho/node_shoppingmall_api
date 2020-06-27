

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotEnv = require("dotenv");
dotEnv.config();


const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");

//database 연결
require("./config/database");

// middle ware 설정
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// router
app.use("/product", productRoute);
app.use("/order", orderRoute);
// app.use("/", (req, res))


const PORT = process.env.PORT || 7000;
app.listen(PORT, console.log("server started"));