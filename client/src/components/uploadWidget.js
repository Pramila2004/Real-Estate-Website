import React, { useEffect, useRef } from 'react';
import '../styles/Newpost.css';

const UploadWidget = ({ uwConfig, setAvatar }) => {
  const uploadWidgetRef = useRef(null);
  const uploadButtonRef = useRef(null);

  useEffect(() => {
    if (!window.cloudinary || !uploadButtonRef.current) return;

    // Create upload widget
    uploadWidgetRef.current = window.cloudinary.createUploadWidget(
      { ...uwConfig },
      (error, result) => {
        if (!error && result && result.event === 'success') {
          console.log('Upload successful:', result.info);

          // Update state with new image URL
          setAvatar(result.info.secure_url);
        } else if (error) {
          console.error('Upload error:', error);
        }
      }
    );

    const handleUploadClick = () => {
      if (uploadWidgetRef.current) {
        uploadWidgetRef.current.open();
      }
    };

    const buttonElement = uploadButtonRef.current;
    buttonElement.addEventListener('click', handleUploadClick);

    // Cleanup event listener
    return () => {
      buttonElement.removeEventListener('click', handleUploadClick);
    };
  }, [uwConfig, setAvatar]);

  return (
    <button
      ref={uploadButtonRef}
      id="upload_widget"
      className="cloudinary-button"
    >
      Upload Images
    </button>
  );
};

export default UploadWidget;
