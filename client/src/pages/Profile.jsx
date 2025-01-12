import React, {  useContext, useEffect, useState } from 'react';
import '../styles/Profile.css';
// import Chat from '../components/Chat.js';
import Card from '../components/Card.js';
import { Link, useNavigate } from 'react-router-dom';
import { post, get } from '../services/ApiEndpoint.js';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext.js';

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser, updateUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [savedPostData, setSavedPostData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Logout handler
  const handlelogout = async (e) => {
    e.preventDefault();
    try {
      const request = await post('/api/auth/logout');
      const response = request.data;
      if (request.status === 200) {
        toast.success(response.message || 'Logout successful');
        updateUser(null);
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during logout');
      console.error('Logout error:', error);
    }
  };

  // Fetch user's own posts
  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        const response = await get(`/api/post/getMyPosts/${currentUser._id}`);
        setData(response.data.posts || []);
      } catch (err) {
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) fetchMyPosts();
  }, [currentUser]);

  // Fetch user's saved posts
  useEffect(() => {
    const fetchMySavedPosts = async () => {
      try {
        const response = await get('/api/save/getSavedPosts');
        setSavedPostData(response.data.savedPosts || []);
      } catch (err) {
        console.error('Error fetching saved posts:', err);
      } finally {
        setLoading(false);
      }
    };
    if (currentUser) fetchMySavedPosts();
  }, [currentUser,savedPostData]);

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <div className="profilePage">
      <div className="details" style={{}}>
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar: <img src={currentUser?.avatar || 'images/user.jpg'} alt="Avatar" />
            </span>
            <span>User Name: {currentUser?.username || 'Loading...'}</span>
            <span>Email: {currentUser?.email || 'Loading...'}</span>
            <button
              className="logout-button"
              onClick={handlelogout}
              style={{ width: 'max-content', backgroundColor: 'black', color: 'white' }}
            >
              Logout
            </button>
          </div>

          {/* My Posts Section */}
          <div className="title">
            <h1>My List</h1>
            <Link to="/newpost">
              <button>Create New Post</button>
            </Link>
          </div>
          <div className="list">
            {loading ? (
              <p>Loading posts...</p>
            ) : (
              <>
                {data.length > 0 ? (
                  data.map((item) => (
                    <Card key={item._id} item={item} isSaved={savedPostData.some((saved) => saved._id === item._id)} />
                  ))
                ) : (
                  <p>No posts available</p>
                )}
              </>
            )}
          </div>

          {/* Saved Posts Section */}
          <div className="title">
            <h1>Saved List</h1>
          </div>
          <div className="list">
            {loading ? (
              <p>Loading saved posts...</p>
            ) : (
              <>
                {savedPostData.length > 0 ? (
                  savedPostData.map((item) => <Card key={item._id} item={item} isSaved={true} />)
                ) : (
                  <p>No saved posts available</p>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Chat Component */}
      {/* <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading....</p>}>
            <Chat chats={data.chatReponse?.data} />
          </Suspense>
        </div>
      </div> */}
    </div>
  );
}
