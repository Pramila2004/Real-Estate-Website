import React from "react";
import "../styles/Home-card.css";
import { Link } from "react-router-dom";


export default function Card({ item }) {


  return (
    <div className="home-card">
        <div className="home-wrapper">
            <div className="home-img-container">
                <Link to={`/singlepage/${item._id}`} className="imageContainer">
                    <img src={item.images[0]} alt={item.title || "Post Image"} />
                </Link>
            </div>
        
            <div className="home-textContainer">
                <h2 className="title">
                    <Link to={`/singlepage/${item._id}`}>{item.title || "No Title"}</Link>
                </h2>
                <div className="address">
                    <img src="images/pin.png" alt="Pin Icon" />
                    {item.address || "No Address Provided"}
                </div>
                <div className="price">${item.price || "N/A"}</div>
            </div>
        </div>
        
    </div>
  );
}
