import React,{ useContext, useState } from 'react'
import '../styles/Register.css';
import '../styles/Home.css';
import { useNavigate } from "react-router-dom";
import { post } from '../services/ApiEndpoint';
import {toast} from 'react-hot-toast'
import { AuthContext } from '../context/AuthContext';


export default function Loginpage() {

  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const {updateUser}=useContext(AuthContext)
  const navigate = useNavigate();

    const handlesubmit=async(e)=>{
        e.preventDefault()
     
      try {
            const request=await post('/api/auth/login',{email,password})
            const response=request.data;
            

            if (request.status === 200) {
                toast.success(response.message || 'Login successful');
                console.log("On login page")
                updateUser(response.user)
                navigate("/");
            }

        } catch (error) {
            toast.error(
            error.response?.data?.message || 'An error occurred during login');
            console.error('Login error:', error);
      }
    }

  return (
    <div>
      <div className='home-page'>
        <div className="content">
          <div className="text-container">
            <div className="form-container">
              <h2>Login</h2>
              <form onSubmit={handlesubmit}>
                
                
                <label htmlFor="email">Enter Email</label>
                <input required type="email" name="email" id="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                
                <label htmlFor="password">Enter Password</label>
                <input required type="password" name="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                
                <button type="submit">Sign In</button>
                <p>
                  Dont't have an account? <a href="/register">Sign Up</a>
                </p>
              </form>
            </div>
          </div>
          <div className="img-container">
            <img src="images/home-page-img.webp" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}
