import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';
import { useNavigate } from "react-router-dom";
import { put } from '../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';
import '../styles/Update.css'
import UploadWidget from '../components/uploadWidget.js';


export default function Update() {

    const { currentUser, updateUser } = useContext(AuthContext);
    const [username, setUsername] = useState(currentUser.username ||null);
    const [email, setEmail] = useState(currentUser.email || null);
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState(currentUser.avatar || 'images/user.jpg');
   

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
          username: username || undefined,
          email: email || undefined,
          password: password || undefined,
          avatar: avatar || undefined,
      };
  
      console.log("Sending Data:", formData);
  
      try {
          const response = await put(`/api/user/updateUser/${currentUser._id}`, formData);
          console.log("Update Response:", response.data);
  
          if (response.status === 200) {
              toast.success(response.data.message || "Update successful");
              console.log(response.data.user)
              updateUser(response.data.user);
              navigate("/profile");
          }
      } catch (error) {
          console.error("Update Error:", error);
          toast.error(error.response?.data?.message || "An error occurred during update");
      }
  };
  

    return (
        <div className='update-page'>
            <div className="form-container">
                <h2>Update Profile</h2>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                <label htmlFor="">Enter New Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  aria-label="Enter New Username"
                  placeholder="User Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />

                <label htmlFor="">Enter New Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  aria-label="Enter New Email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <label htmlFor="">Enter New Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  aria-label="Enter New Password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                    <button type="submit">Update</button>
                </form>
            </div>
            <div className='upload-section'>
                <div className="image-container">
                  <img src={avatar} alt="" />
                </div>
                <div className='button-for-upload'>

                <UploadWidget
                  uwConfig={{
                    cloudName: 'dk8eotfsn',
                    uploadPreset: 'estate',
                    folder: 'avatars',
                  }}
                  setAvatar={setAvatar} 
                />
                    
                  
                </div>
            </div>
        </div>
    );
}
