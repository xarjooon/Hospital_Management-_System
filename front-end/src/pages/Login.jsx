import React, { useContext, useState } from 'react'
import { context } from '../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
   const {isAuthenticated,setIsAuthenticated} = useContext(context)


    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");
    const navigate = useNavigate();


    const handleLogin = async (e)=>{
        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:4000/api/v1/user/login",
                {
                    email,
                    password,
                    confirmPassword,
                    role:"Patient"
                }
                ,{withCredentials:true,
                headers:{
                    "Content-Type":"application/json"
                }
            })
                toast.success(response.data.message)
                setIsAuthenticated(true),
                navigate("/")
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };


    if(isAuthenticated){
        return <Navigate to={"/"}/>
    }
  return (
    <div className='container form-component login-form '>
        <h2>Sign in</h2>
        <p>Please Login to continue</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni saepe aut soluta veritatis qui atque.</p>
        <form onSubmit={handleLogin}>
            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='email' />
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
            <input type="text" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} placeholder='confirm Password' />
            <div style={{gap:"10px", justifyContent:"flex-end",flexDirection:"row"}}>
            <p style={{marginBottom:0}}>Not Registerd?</p>
            <Link to={'/register'} style={{textDecoration:"none",alignItems:"center"}}>Register here...</Link>
        </div>
        <div style={{justifyContent:"center", alignItems:"center"}}>
            <button type='submit'>Login</button>
        </div>
        </form>
        
    </div>
  )
}

export default Login