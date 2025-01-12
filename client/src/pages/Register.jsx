import React, { useState } from 'react';
import '../styles/Register.css';
import '../styles/Home.css';
import { post } from '../services/ApiEndpoint.js';
import {toast} from 'react-hot-toast'



export default function Register() {
  const[username,setName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPassword]=useState('')

  const handlesubmit=async(e)=>{

      e.preventDefault()
      try {
          const request=await post('/api/auth/register',{username,email,password})
          const response=request.data;
          console.log(response)
          if (request.status === 200) {
              toast.success(response.message || 'Register successful');
              e.target.reset();
          }
      } catch (error) {
          toast.error(
              error.response?.data?.message || 'An error occurred during register'
          );
          console.log(error)
      }

  }
  return (
    <div className='home-page'>
      <div className="content">
        <div className="text-container">
          <div className="form-container">
            <h2>Create an Account</h2>
            <form onSubmit={handlesubmit}>
              <label htmlFor="username">Enter Username</label>
              <input required type="text" name="username" id="username" placeholder="User Name" onChange={(e)=>setName(e.target.value)} />
              
              <label htmlFor="email">Enter Email</label>
              <input required type="email" name="email" id="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
              
              <label htmlFor="password">Enter Password</label>
              <input required type="password" name="password" id="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
              
              <button type="submit">Sign Up</button>
              <p>
                Already have an account? <a href="/login">Sign In</a>
              </p>
            </form>
          </div>
        </div>
        <div className="img-container">
          <img src="images/home-page-img.webp" alt="" />
        </div>
      </div>
    </div>
  );
}




