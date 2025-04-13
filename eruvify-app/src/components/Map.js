import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './Map.css';

const Map = () => {
  // Philadelphia coordinates
  const philadelphiaCenter = {
    lat: 39.9526,
    lng: -75.1652
  };
  
  // For map container sizing
  const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  // Default map options
  const [mapOptions] = useState({
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: true,
    mapTypeControl: true,
  });
  
  // Example locations of eruv boundaries (would need real coordinates)
  const eruvMarkers = [
    { lat: 39.9526, lng: -75.1652, name: "Center City Eruv" },
    { lat: 39.9678, lng: -75.1939, name: "University City Eruv" },
    { lat: 39.9404, lng: -75.1892, name: "South Philly Eruv" },
  ];

  return (
    <div className="map-screen">
      <h2>Eruv Map</h2>
      
      <div className="map-container">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={philadelphiaCenter}
            zoom={13}
            options={mapOptions}
          >
            {/* Map markers for eruv locations */}
            {eruvMarkers.map((marker, index) => (
              <Marker
                key={index}
                position={{ lat: marker.lat, lng: marker.lng }}
                title={marker.name}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
      
      <div className="map-legend">
        <div className="legend-item">
          <span className="legend-marker"></span>
          <span>Eruv Boundaries</span>
        </div>
      </div>
    </div>
  );
};

export default Map;