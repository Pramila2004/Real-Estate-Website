import React, { useContext, useEffect, useState } from 'react';
import Slider from '../components/slider.js'; // Assuming Slider is already set up
import '../styles/Singlepage.css';
import { useParams,useNavigate } from 'react-router-dom';
import { get, post } from '../services/ApiEndpoint.js';
import { AuthContext } from '../context/AuthContext.js';
import { toast } from 'react-hot-toast';

export default function Singlepage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { id } = useParams(); // Get the post ID from the URL
  const [data, setData] = useState(null); // Post data state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isSaved, setIsSaved] = useState(false); // Save state for the current post

  const handlePostSave = async (e) => {
    e.preventDefault();
    try {
      if (!currentUser) {
          toast.success(
            "Login First To save the place"
        );
          navigate('/login');
      }
      const userId = currentUser._id;
      const postId = id;
      const response = await post('/api/save/savePost', { userId, postId });

      if (response.status === 200) {
        setIsSaved(response.data.isSaved);
        toast.success(
          response.data.message || (response.data.isSaved ? 'Post saved successfully!' : 'Post unsaved successfully!')
        );
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || 'Failed to save the post.');
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await get(`/api/post/getPost/${id}`);
        setData(response.data.post);
      } catch (err) {
        setError('Failed to fetch post data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const checkIfSaved = async () => {
      try {
        const response = await get('/api/save/getSavedPosts');
        const savedPostIds = response.data.savedPosts?.map((post) => post._id) || [];
        setIsSaved(savedPostIds.includes(id));
      } catch (err) {
        console.error('Error fetching saved posts:', err);
      }
    };

    fetchPostData();
    checkIfSaved();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // const handleMessageSubmit = async (e) => {
  //         e.preventDefault();
          // const formData = new FormData(e.target);
          // const text = formData.get('text');
          // if (!text) return;
          // try {
          //     const res = await post(`/api/messages/addMessage/${chat._id}`, { text });
          //     setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
          //     e.target.reset();
          // } catch (error) {
          //     console.log(error);
          // }
      // };


  return (
    <div className="singlepage">
      <div className="details">
        <div className="wrapper">
          {/* Slider */}
          <Slider images={data.images || []} isOpen={false} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h3>{data.title || 'No Title'}</h3>
                <div className="address">
                  <img src="/images/pin.png" alt="Location pin" />
                  <span>{data.address || 'No Address Provided'}</span>
                </div>
                <div className="price">${data.price || 'N/A'}</div>
              </div>
              <div className="user">
                <img src={data.user?.avatar || '/images/user.jpg'} alt={data.user?.username || 'User'} />
                <span>{data.user?.username || 'Anonymous User'}</span>
              </div>
            </div>
            <div className="bottom">{data.description || 'No description available.'}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="list-vertical">
            <div className="feature">
              <img src="/images/utility.png" alt="Utility icon" />
              <div className="feature-text">
                <span>Utility Title</span>
                <p>Rental is Responsible</p>
              </div>
            </div>
            <div className="feature">
              <img src="/images/pet.png" alt="Pet policy icon" />
              <div className="feature-text">
                <span>Pet Policy</span>
                <p>Pet Allowed</p>
              </div>
            </div>
            <div className="feature">
              <img src="/images/fee.png" alt="Fee icon" />
              <div className="feature-text">
                <span>Property Fees</span>
                <p>Must have 3x the rent in total household income</p>
              </div>
            </div>
          </div>
          <div className="sizes">
            <div className="size">
              <img src="/images/size.png" alt="Size icon" />
              <span>{data.size || 'N/A'} sqft</span>
            </div>
            <div className="size">
              <img src="/images/bed.png" alt="Bed icon" />
              <span>{data.bedroom || '0'} Bed</span>
            </div>
            <div className="size">
              <img src="/images/bath.png" alt="Bathroom icon" />
              <span>{data.bathroom || '0'} Bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="list-horizontal">
            <div className="feature">
              <img src="/images/school.png" alt="School icon" />
              <div className="feature-text">
                <span>School</span>
                <p>250m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/images/bus.png" alt="Bus stop icon" />
              <div className="feature-text">
                <span>Bus Stop</span>
                <p>100m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/images/restaurant.png" alt="Restaurant icon" />
              <div className="feature-text">
                <span>Restaurant</span>
                <p>200m away</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            {/* <button onClick={handleMessageSubmit}>
              <img src="/images/chat.png" alt="Chat icon" />
              Send a Message
            </button> */}
            <button
              onClick={handlePostSave}
              style={{
                backgroundColor: isSaved ? '#fece51' : 'white', // Yellow if saved, white otherwise
              }}
            >
              <img src="/images/save.png" alt="Save Icon" /> Save the Place
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
