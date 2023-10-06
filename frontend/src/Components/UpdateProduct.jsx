import React, { useEffect, useState } from "react";
import {useParams,useNavigate} from "react-router-dom"

const UpdateProduct =()=>{
    
    const[name,setName] = useState("")
    const[price,setPrice] = useState("")
    const[category,setCategory] = useState("")
    const[company,setCompany] = useState("")
    
    const params = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        getProductDetails()
    },[])

    
    //to fill products into update product
    const getProductDetails = async()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`)
        result = await result.json()
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
        
    }

    //to update the product
    const updateProduct = async()=>{
        console.log(name,price,category,company)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,category,company}),
            headers:{"Content-Type":"application/json"}
        })

        result = await result.json()
        console.log(result)
        navigate("/")


    }



    return(
        <div className="product">
            <h1>Update Product</h1>
            <input type="text" placeholder="Enter Product Name" autoFocus
            value={name} onChange={(e)=>setName(e.target.value)}/>
            
            
            <input  type="text" name="" id="" placeholder="Enter Product Price" 
            value={price} onChange={(e)=>setPrice(e.target.value)} />
            
            
            <input  value={category} onChange={(e)=>setCategory(e.target.value)} type="text" name="" id="" placeholder="Enter Product Category" />
            
            
            <input value={company} onChange={(e)=>setCompany(e.target.value)} type="text" name="" id="" placeholder="Enter Product Company" /><br/>
            
            
            <button onClick={updateProduct}>Update Product</button>
        </div>
    )
}

export default UpdateProduct