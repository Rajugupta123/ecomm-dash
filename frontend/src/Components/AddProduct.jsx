import React, { useState } from "react";
import "../styles/addProduct.css"

const AddProduct = ()=>{

    const[name,setName] = useState("")
    const[price,setPrice] = useState("")
    const[category,setCategory] = useState("")
    const[company,setCompany] = useState("")
    const[err,setErr] = useState(false)

    const style={
        color:"Red",
        display:"block",
        marginTop:"-20px",
        marginLeft:"3px"
    }

    const addProduct = async()=>{
        console.warn(name,price,category,company)
        if(!name || !price || !category || !company){
            setErr(true)
            return false;    
        }

        const userId = JSON.parse(localStorage.getItem("user"))._id
        console.log(userId)
        let result = await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,category,company,userId}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json()
        console.warn(result)

    }


    return(
        <div className="product">
            <h1>Add Product</h1>
            <input value={name} onChange={(e)=>setName(e.target.value)} type="text" name="" id="" placeholder="Enter Product Name" autoFocus/>
            {err && !name && <span style={style}>Enter valid name*</span>}
            
            <input value={price} onChange={(e)=>setPrice(e.target.value)} type="text" name="" id="" placeholder="Enter Product Price" />
            {err && !price && <span style={style}>Enter valid price*</span>}
            
            <input  value={category} onChange={(e)=>setCategory(e.target.value)} type="text" name="" id="" placeholder="Enter Product Category" />
            {err && !category && <span style={style}>Enter valid category*</span>}
            
            <input value={company} onChange={(e)=>setCompany(e.target.value)} type="text" name="" id="" placeholder="Enter Product Company" /><br/>
            {err && !company && <span style={style}>Enter valid company*</span>}
            
            <button onClick={addProduct}>Add Product</button>
        </div>
    )
}


export default AddProduct