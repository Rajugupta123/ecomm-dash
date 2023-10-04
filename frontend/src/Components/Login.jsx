import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import "../styles/login.css"


const Login = ()=>{

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    //to prevent force login
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth){
            navigate("/")
        }
    })

    const handleLogin = async()=>{
        console.warn(email,password)
        let result = await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json()
        console.warn(result)

        if(result.name){
            localStorage.setItem("user",JSON.stringify(result))
            navigate("/")
        }else{
            alert("match not found..!!")
        }
    }
    
    
    return(
        <div className="login">
            <form action="">
                <h1>Login</h1>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" name="" id="name" placeholder="Enter Your Email"  autoFocus/>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" name="" id="pwd" placeholder="Enter Your Password" autoComplete="on" /><br/>
                
            </form>
            <button onClick={handleLogin} type="submit">Login</button>
        </div>
    )
}

export default Login 