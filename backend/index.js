const express = require("express")
const app = express()
const cors = require("cors")
require("./db/config")
const User = require("./db/User")
const Product = require("./db/Product")

const jwt = require("jsonwebtoken")
const jwtKey = "e-comm"


app.use(express.json())
app.use(cors())

//register a user
app.post("/register", async (req, res) => {
    const data = new User(req.body)
    let result = await data.save()
    result = result.toObject()
    delete result.password
    
    //jwt token
    jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
        if (err) {
            res.send({ result: "something went wrong,Try Again" })
        }
        res.send({ result, auth: token })
    })
})


//login user
app.post("/login", async (req, res) => {
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            //jwt token
            jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
                if (err) {
                    res.send({ result: "something went wrong,Try Again" })
                }
                res.send({ user, auth: token })
            })

        } else {
            res.send({ result: "no user found" })
        }
    } else {
        res.send({ result: "no user found" })
    }

})

//to add single product
app.post("/add-product", async (req, res) => {
    const data = new Product(req.body)
    let result = await data.save()
    res.send(result)
})

//get all products
app.get("/products", async (req, res) => {
    const products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Products found" })
    }
})

//delete product
app.delete("/product/:id", async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})


//get single product
app.get("/product/:id", async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "no product found" })
    }
})


//update single product
app.put("/product/:id", async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})


//search products
app.get("/search/:key", async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    res.send(result)

})




app.listen(5000)