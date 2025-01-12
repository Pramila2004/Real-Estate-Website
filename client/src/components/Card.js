import React, { useContext, useState, useEffect } from "react";
import "./componentsStyle.css";
import { Link,useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";
import { post, get } from "../services/ApiEndpoint.js";
import { toast } from "react-hot-toast";

export default function Card({ item, isSavedInitially }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [isSaved, setIsSaved] = useState(isSavedInitially);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSavedStatus = async () => {
      try {
        setLoading(true);
        const response = await get("/api/save/getSavedPosts");
        const savedPosts = response.data.savedPosts || [];

        // Check if the current post is saved
        const savedIds = savedPosts.map((post) => post._id);
        setIsSaved(savedIds.includes(item._id));
      } catch (err) {
        console.error("Error fetching saved status:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchSavedStatus();
    }
  }, [currentUser, item._id]);

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
      const postId = item._id;
      const request = await post("/api/save/savePost", { userId, postId });
      const response = request.data;

      if (request.status === 200) {
        setIsSaved(response.isSaved);
        toast.success(
          response.message || (response.isSaved ? "Post saved successfully" : "Post unsaved successfully")
        );
      }
    } catch (error) {
      // toast.error(error.response?.data?.message || "Failed to save the post");
      console.error("Error saving the post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card">
      <Link to={`/singlepage/${item._id}`} className="imageContainer">
        <img src={item.images[0]} alt={item.title || "Post Image"} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/singlepage/${item._id}`}>{item.title || "No Title"}</Link>
        </h2>
        <div className="address">
          <img src="images/pin.png" alt="Pin Icon" />
          {item.address || "No Address Provided"}
        </div>
        <div className="price">${item.price || "N/A"}</div>
        <div className="extra-details">
          <div className="detail">
            <img src="images/bed.png" alt="Bed Icon" />
            <p>{item.bedroom || "0"}</p>

            <img src="images/bath.png" alt="Bath Icon" />
            <p>{item.bathroom || "0"}</p>
          </div>
          <div className="detail icons">
            <button
              onClick={handlePostSave}
              style={{
                backgroundColor: isSaved ? "#fece51" : "white", // Highlight if saved
              }}
            >
              <img src="images/save.png" alt="Save Icon" />
            </button>
            {/* <img src="images/chat.png" alt="Chat Icon" /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
