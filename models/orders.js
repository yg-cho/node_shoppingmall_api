const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
    number : Number,
    date : Date
});

module.exports = mongoose.model("order", orderSchema);