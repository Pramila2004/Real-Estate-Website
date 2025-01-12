import React, { useContext, useState } from 'react';
import '../styles/Newpost.css';
import UploadWidgetPost from '../components/uploadWidgetPost.js';
import { AuthContext } from '../context/AuthContext.js';
import { post } from '../services/ApiEndpoint.js';
import { useNavigate } from "react-router-dom";
import {toast} from 'react-hot-toast'


export default function Newpost() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    address: "",
    city: "",
    bedroom: "",
    bathroom: "",
    type: "any",
    property: "any",
    latitude: "",
    longitude: "",
    description:"",
    images: [],
    user:currentUser,
    userId:currentUser._id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (newImageUrl) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, newImageUrl], // Add the new image URL to the images array
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const request=await post('/api/post/createPost',formData)
      const response=request.data;
      console.log(response)
      

      if (request.status === 200) {
          toast.success(response.message || 'Post created successfully');
          navigate("/profile");
      }

  } catch (error) {
      toast.error(
      error.response?.data?.message || 'An error occurred during post creation');
      
}
   
  };

 

  return (
    <div className="new-post-page">
      
      <div className="form-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          required
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />

        <label htmlFor="price">Price</label>
        <input
          required
          type="number"
          id="price"
          name="price"
          min="0"
          value={formData.price}
          onChange={handleInputChange}
        />

        <label htmlFor="address">Address</label>
        <input
          required
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <label htmlFor="city">City</label>
        <input
          required
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleInputChange}
        />

        <label htmlFor="bedroom">Bedrooms</label>
        <input
          type="number"
          id="bedroom"
          name="bedroom"
          min="0"
          value={formData.bedroom}
          onChange={handleInputChange}
        />

        <label htmlFor="bathroom">Bathrooms</label>
        <input
          type="number"
          id="bathroom"
          name="bathroom"
          min="0"
          value={formData.bathroom}
          onChange={handleInputChange}
        />

        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
        >
          <option value="any">Any</option>
          <option value="Buy">Buy</option>
          <option value="Rent">Rent</option>
        </select>

        <label htmlFor="property">Property</label>
        <select
          id="property"
          name="property"
          value={formData.property}
          onChange={handleInputChange}
        >
          <option value="any">Any</option>
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Land">Land</option>
        </select>

        <label htmlFor="estateDescription">Estate Description</label>
        <textarea
          required
          id="estateDescription"
          name="description"
          value={formData.estateDescription}
          onChange={handleInputChange}
          rows="5" // Adjust number of rows for height
          cols="30" // Adjust number of columns for width
          placeholder="Enter the estate description here..."
        ></textarea>


        <label htmlFor="latitude">Latitude</label>
        <input
          required
          type="number"
          id="latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleInputChange}
        />

        <label htmlFor="longitude">Longitude</label>
        <input
          required
          type="number"
          id="longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleInputChange}
        />
          <button type="submit">Create Post</button>
        </form>
      </div>

      <div className="upload-img-section">
        <h3>Uploaded Images</h3>
        <div className="images-section">
        {formData.images.length > 0 && (
          <div className="image-preview">
            {formData.images.map((src, index) => (
              <img key={index} src={src} alt={`Uploaded ${index + 1}`} />
            ))}
          </div>
        )}
          <UploadWidgetPost
            uwConfig={{
              cloudName: 'dk8eotfsn',
              uploadPreset: 'estate',
              folder: 'posts',
              multiple: true,
            }}
            setAvatar={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
