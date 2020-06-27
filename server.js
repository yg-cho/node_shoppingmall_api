

const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoute = require("./routes/products");
const orderRoute = require("./routes/orders");

// database 연결
const db = "mongodb+srv://root:12345@cluster0-fe4rr.mongodb.net/shoppingmall?retryWrites=true&w=majority";

// promise 절차적인 약속
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true , useFindAndModify: true} )
    .then(() => console.log("MongoDB connected ..."))
    .catch(err => console.log(err.message));




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