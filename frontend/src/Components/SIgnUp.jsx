import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import "../styles/signup.css"

const SignUp = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    //to prevent force signup
    useEffect(()=>{
        const auth = localStorage.getItem("user")
        if(auth){
            navigate("/")
        } 
    })

    const collectData = async () => {
        console.warn(name, email, password)
        let result = await fetch("http://127.0.0.1:5000/register", {
            method: "post",
            body: JSON.stringify({ name, email, password }),
            headers: { "Content-Type": "application/json" }
        })
        result = await result.json()
        localStorage.setItem("user",JSON.stringify(result.result))
        localStorage.setItem("token",JSON.stringify(result.auth))
        console.warn(result)

        if(result){
           return navigate("/")
        }

    }

    
    return (
        <div className="signup">

            <form action="">
                <h1>Register</h1>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="" id="name" placeholder="Enter Your Name" autoFocus required /><br />

                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="" id="email" placeholder="Enter Your Email" required /><br />

                
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="" id="password" placeholder="Enter Your Password" required autoComplete="off" /><br />

            </form> 
                
                <button onClick={collectData} type="submit">submit</button>
            
        </div>
    )
}


export default SignUp