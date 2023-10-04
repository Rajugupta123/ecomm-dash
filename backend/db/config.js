const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/ecomm")
.then(console.log(`connects successfully`))
.catch((err)=>console.log(err))
