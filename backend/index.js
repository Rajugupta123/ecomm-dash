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
app.post("/add-product",verifyToken, async (req, res) => {
    const data = new Product(req.body)
    let result = await data.save()
    res.send(result)
})

//get all products
app.get("/products",verifyToken, async (req, res) => {
    const products = await Product.find()
    if (products.length > 0) {
        res.send(products)
    } else {
        res.send({ result: "No Products found" })
    }
})

//delete product
app.delete("/product/:id",verifyToken, async (req, res) => {
    const result = await Product.deleteOne({ _id: req.params.id })
    res.send(result)
})


//get single product
app.get("/product/:id",verifyToken,async (req, res) => {
    let result = await Product.findOne({ _id: req.params.id })
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "no product found" })
    }
})


//update single product
app.put("/product/:id",verifyToken, async (req, res) => {
    let result = await Product.updateOne(
        { _id: req.params.id },
        { $set: req.body }
    )
    res.send(result)
})


//search products
app.get("/search/:key", verifyToken, async (req, res) => {
    let result = await Product.find({
        "$or": [
            { name: { $regex: req.params.key } },
            { category: { $regex: req.params.key } },
            { company: { $regex: req.params.key } }
        ]
    })
    res.send(result)

})

//middleware
function verifyToken(req, res, next){
    let token = req.headers["authorization"]
    if(token){
        token = token.split(" ")[1]
        //verify token
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res
                .status(401)
                .send({result:"please provide valid token"})
            }else{
                next()
            }
        })
    }else{
        res
        .status(403)
        .send({result:"please add token with header"})
    }
    //console.warn("middleware called",token)
    
}


app.listen(5000)