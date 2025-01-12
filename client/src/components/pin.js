import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Link } from 'react-router-dom';


// Define the custom icon
const customIcon = new L.Icon({
  iconUrl: '/images/map-pin.png', // Path to your pin image
  iconSize: [32, 32], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Point from which the popup should open relative to the icon anchor
});

const Pin = ({ item }) => (
  <Marker position={[item.latitude, item.longitude]} icon={customIcon}>
    <Popup>
      <div>
        <Link to={`/singlepage/${item._id}`} className="imageContainer">
        <h3>{item.title}</h3>
        </Link>
        <p>{item.address}</p>
        <p>${item.price}</p>
      </div>
    </Popup>
  </Marker>
);

export default Pin;
