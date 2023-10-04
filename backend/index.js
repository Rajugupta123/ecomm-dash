const express = require("express")
const app = express()
const cors = require("cors")
require("./db/config")
const User = require("./db/User")
const Product = require("./db/Product")

app.use(express.json())
app.use(cors())

app.post("/register", async (req, res) => {
    const data = new User(req.body)
    let result = await data.save()
    result = result.toObject()
    delete result.password
    res.send(result)
})

app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user)
        } else {
            res.send({ result: "no user found" })
        }
    } else {
        res.send({ result: "no user found" })
    }

})

app.post("/add-product",async(req,res)=>{
    const data = new Product(req.body)
    let result = await data.save()
    res.send(result)
})

app.get("/products", async(req,res)=>{
    const result = await Product.find()
    res.send(result)
})

app.listen(5000)