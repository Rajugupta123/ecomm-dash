const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
})


module.exports = new mongoose.model("products",schema)