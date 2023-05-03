import React from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
function LightMap({ lights }) {
  return (
    <MapContainer center={[45.815399, 15.966568]} zoom={13} scrollWheelZoom={false}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {lights && lights.map(light => (
        <Marker key={light.id} position={[light.lat, light.lng]}>
          <Popup>
            <div>
              <h3>{light.name}</h3>
              <p>{light.location}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LightMap;
