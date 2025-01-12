import React, { useEffect, useState } from 'react';
import '../styles/Home.css'; 
import { Link } from 'react-router-dom';
import Searchbar from '../components/Searchbar';
import { get } from '../services/ApiEndpoint.js';
import HomePageCard from '../components/HomePageCard.js';
import Footer from '../components/Footer.js';

export default function Home() {

   const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

      
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const response = await get('/api/post/getPosts'); // Adjust the endpoint URL to match your backend
          const posts=response.data.posts;
          setPosts(posts);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchPosts();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }

  return (
    <div className='home-page'>
      <div className="content">
        <div className="text-container">
          <h1 className='title'>Find Real Estate and get your Dream Place</h1>
          <p>Discover your dream home with NextSphere Realty—your trusted partner in finding exceptional properties tailored to your needs. Whether you're buying, selling, or investing, we provide expert guidance, modern tools, and unparalleled service to turn your real estate dreams into reality.</p>
          <Searchbar />
          <div className="boxes">
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>1200+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
        <div className="img-container">
          <img src="images/home-page-img.webp" alt="" />
        </div>
        
      </div>
      <div className="explore-button">
      <Link to={'/list'}>
        <button className='explore'>Explore</button>
      </Link>
      </div>
      
      
      <div className="list-properties" >
          
          {posts.length > 0 ? (
            posts.map((item, index) => <HomePageCard key={index} item={item} />)
            ) : (
            <div>No posts available.</div>
            )}
      </div>
      
      <Footer/>

    </div>
  );
}
