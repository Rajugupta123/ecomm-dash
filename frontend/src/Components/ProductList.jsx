import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import "../styles/productList.css"
const ProductList = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization:JSON.parse(localStorage.getItem("token"))
      }
    })
    result = await result.json()
    setProducts(result)

  }

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "delete"
    })
    result = await result.json()
    if (result) {
      alert("product deleted successfully")
      getProducts()
    }
  }

  const searchHandle = async (e) => {
    //console.warn(e.target.value)
    let key = e.target.value
    if (key) {
      let result = await fetch(`http://localhost:5000/search/${key}`)
      result = await result.json()
      setProducts(result)
    } else {
      getProducts()
    }

  }


  return (
    <div className="product-list">
      <h2>Products List</h2>
      <input type="search" name="" id="" style={{ textAlign: "center",width:"25rem" }} placeholder="search product" onChange={searchHandle} autoFocus />
      <ul>
        <li>S.N</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Delete</li>
        <li>Update</li>
      </ul>

      {
        products.length > 0 ? products.map((item, index) => {
          return (
            <ul key={item._id}>

              <li>{index + 1}</li>
              <li>{item.name}</li>
              <li>{item.price}</li>
              <li>{item.category}</li>
              <li>{item.company}</li>
              {/* <li className="btn"><button className="dlt" onClick={() => deleteProduct(item._id)}>Delete</button></li> */}
              <li><Link className="lnk" onClick={() => deleteProduct(item._id)} >Delete</Link></li>
              <li><Link className="udt" to={"/update/" + item._id} >Update</Link></li>
            </ul>
          )
        }

        )
        :<h1>No Produts Found</h1>
      }

    </div>
  )
}


export default ProductList