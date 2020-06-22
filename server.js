

const express = require("express");
const app = express();

// app.use((req,res) => {
//     res.json({
//         message: 'It works!'
//     });
// });


const productRoute = require("./routes/products");


app.use("/product", productRoute);




const PORT = 3000;
app.listen(PORT, console.log("server started"));