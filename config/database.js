const mongoose = require("mongoose");
// promise 절차적인 약속
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB connected ..."))
    .catch(err => console.log(err.message));

//
// const mongoose = require('mongoose');
// require('dotenv').config();
//
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
//     .then(() => console.log("MongoDB connected ..."))
//     .catch(err => console.log("MongoDB connection error:", err.message));