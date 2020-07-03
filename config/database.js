const mongoose = require("mongoose");

// promise 절차적인 약속
mongoose.connect(process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true ,
        useFindAndModify: true
    })
    .then(() => console.log("MongoDB connected ..."))
    .catch(err => console.log(err.message));

