import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"
import "../styles/productList.css"
const ProductList = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  },[])

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products")
    result = await result.json()
    setProducts(result)

  }

  const deleteProduct= async(id)=>{
    let result = await fetch(`http://localhost:5000/product/${id}`,{
      method:"delete"
    })
    result = await result.json()
    if(result){
      alert("product deleted successfully")
      getProducts()
    }
  }
  

  return (
    <div className="product-list">
      <h2>Products List</h2>
      <ul>
        <li>S.N</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Operation</li>
      </ul>

      {
        products.map((item, index) => {
          return (
            <ul key={item._id}>

              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              <li className="btn-li"><button className="btn" onClick={()=>deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/"+item._id}>Update</Link>  
              </li>
            </ul>
          )
        }


      )}

    </div>
  )
}


export default ProductList