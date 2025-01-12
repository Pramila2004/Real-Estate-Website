import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Listpage.css';
import Pin from './pin';

const CustomMap = ({ data }) => {
  const defaultPosition = [18.650890, 73.778496]; // Default position (e.g., San Francisco)

  return (
    <MapContainer center={defaultPosition} zoom={7} scrollWheelZoom={false} className="map">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((item, index) => (
        <Pin key={index} item={item} /> 
      ))}
    </MapContainer>
  );
};

export default CustomMap;
