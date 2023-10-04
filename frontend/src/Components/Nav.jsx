import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/nav.css"
import logo from "../images/logo.jpg"

const Nav = () => {

    const auth = localStorage.getItem("user")
    const navigate = useNavigate()
    const logOut = () => {
        //console.warn("logout clicked")
        localStorage.clear()
        navigate("/signup")
    }

    return (
        <div className="nav">
            <img className="logo" src={logo} alt="logo"/>
            {auth ?
                <ul className="nav-ul">
                    
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li></li>
                    <li style={{float:"right"}}><Link onClick={logOut} to="/signup">Logout </Link></li>
                    <li style={{float:"right"}}><Link>{(JSON.parse(auth)).name}</Link></li>
                </ul>
                :
                <ul className="nav-ul" style={{textAlign:"right"}}>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>


            }
        </div>
    )
}

export default Nav 