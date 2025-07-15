
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";


const emergencyCenters = [
  { name: "City Hospital", latOffset: 0.001, lonOffset: 0.001 },
  { name: "Police Station", latOffset: -0.001, lonOffset: 0.0015 },
  { name: "Fire Department", latOffset: 0.0012, lonOffset: -0.001 },
];

const MapView = ({ lat, lon }) => {
  const position = [lat, lon];

  const userIcon = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });

  return (
    <div className="mx-auto w-[90%] max-w-xl"> {/* 👈 Center and control width */}
      <MapContainer
        center={position}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "300px", width: "100%" }} // fills container width
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>
        {emergencyCenters.map((center, index) => (
          <Marker
            key={index}
            position={[lat + center.latOffset, lon + center.lonOffset]}
          >
            <Popup>{center.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapView;
