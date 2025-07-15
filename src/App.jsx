import React, { useState } from "react";
import CanvasMap from "./components/CanvasMap";
import HelpCard from "./components/HelpCard";
import NetworkStatus from "./components/NetworkStatus";

const dummyData = [
  { name: "City Hospital", dist: "0.5 km", contact: "1800-111-222" },
  { name: "Police Station", dist: "1.2 km", contact: "100" },
  { name: "Fire Department", dist: "2.0 km", contact: "101" },
];

function App() {
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setLocation({ lat: latitude, lon: longitude });
        },
        (err) => {
          alert("Location error: " + err.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
     <div className="text-center p-6 font-sans bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🚨 Emergency Help Finder</h1>
      <NetworkStatus />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={getLocation}
      >
        📍 Find Nearby Help
      </button>

      <div className="mt-6">
        {location && <CanvasMap lat={location.lat} lon={location.lon} />}
      </div>

      <div className="mt-10 space-y-4">
        {location &&
          dummyData.map((help, idx) => (
            <HelpCard key={idx} help={help} />
          ))}
      </div>
    </div>
  );
}

export default App
