import React, { useState } from "react";
import "../styles/ContactPage.css"; // Import a CSS file for styling
import { toast } from 'react-hot-toast';
import { post } from "../services/ApiEndpoint.js";

// Details submitted successfully!


export default function ContactPage() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const request=await post('/api/contact/addContact',formData)
            const response=request.data;
            if (request.status === 200) {
                toast.success(response.message || 'Details submitted successfully!');
               
            }
        } 
        catch (error) {
        toast.error(
        error.response?.data?.message || 'An error occurred during post creation');
        
        }
        e.target.reset()
    };


  return (
    <div className="contact-page">
      <h1 className="contact-title">Get in Touch</h1>
      <p className="contact-description">
        Have questions or need assistance? Fill out the form below, and our team will get back to you promptly.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        {/* Name Section */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input onChange={handleChange}  type="text" id="name" name="name" placeholder="Enter your full name" required />
        </div>

        {/* Email Section */}
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input onChange={handleChange} type="email" id="email" name="email" placeholder="Enter your email address" required />
        </div>

        {/* Phone Section */}
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input onChange={handleChange}  type="tel" id="phone" name="phone" placeholder="Enter your phone number" required />
        </div>

        {/* Message Section */}
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea onChange={handleChange}  id="message" name="message" placeholder="Write your message here" rows="5" required></textarea>
        </div>

        {/* Submit Button */}
        <div className="form-group">
          <button type="submit" className="contact-submit-btn">
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
