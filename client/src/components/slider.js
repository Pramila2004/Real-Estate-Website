import React, { useState } from 'react';

export default function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null); // Initially, no image is selected

  // Ensure images array is valid and has at least one item
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  const changeSlide = (direction) => {
    if (direction === 'left') {
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    } else {
      setImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className="slider">
      {/* Show the slider only if an image is selected */}
      {imageIndex !== null && (
        <div className="fullslider">
          <div className="arrow">
            <img
              src="/images/arrow.png"
              alt="Left Arrow"
              onClick={() => changeSlide('left')}
            />
          </div>
          <div className="imagecontainer">
            <img
              src={images[imageIndex]}
              alt=""
              onClick={() => changeSlide('right')}
            />
          </div>
          <div className="arrow">
            <img
              src="/images/arrow.png"
              className="right"
              alt=""
              onClick={() => changeSlide('right')}
            />
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
            X
          </div>
        </div>
      )}

      {/* Render big image and small thumbnails */}
      <div className="bigimg">
        <img
          src={images[0]}
          alt=""
          onClick={() => setImageIndex(0)} // Open slider on click
        />
      </div>
      <div className="smallimg">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 2}`}
            key={index}
            onClick={() => setImageIndex(index + 1)} // Open slider on thumbnail click
          />
        ))}
      </div>
    </div>
  );
}
