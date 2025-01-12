import React, { useEffect,useState } from 'react';
import '../styles/Listpage.css';
import Card from '../components/Card.js';
import CustomMap from '../components/mapContainer.js';
import { get } from '../services/ApiEndpoint.js';


export default function Listpage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await get('/api/post/getPosts'); // Adjust the endpoint URL to match your backend
        const posts=response.data.posts;
        console.log('Fetched posts:', posts);
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
    <div className="list-page">
        <div className="listContainer">
        <div className="title">
            <h2>List of Locations</h2>
        </div>
          <div className="wrapper">
          {posts.length > 0 ? (
            posts.map((item, index) => <Card key={index} item={item} />)
          ) : (
            <div>No posts available.</div>
          )}
          </div>
        </div>
        <div className="map">
          <CustomMap data={posts}/>
        </div>
    
    </div>
  );
}
