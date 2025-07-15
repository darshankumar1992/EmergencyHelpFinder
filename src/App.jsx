import React, { useState } from "react";
import CanvasMap from "./components/CanvasMap";
import HelpCard from "./components/HelpCard";
import NetworkStatus from "./components/NetworkStatus";
import MapView from "./components/MapView";

const dummyData = [
  { name: "City Hospital", dist: "0.5 km", contact: "1800-111-222" },
  { name: "Police Station", dist: "1.2 km", contact: "100" },
  { name: "Fire Department", dist: "2.0 km", contact: "101" },
];

function App() {
  const [location, setLocation] = useState(null);
  const [locationName, setLocationName] = useState("");


 

  const fetchLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
    );
    const data = await response.json();
    if (data?.address) {
      const { city, town, village, state, country } = data.address;
      const name = `${city || town || village || state}, ${country}`;
      setLocationName(name);
    } else {
      setLocationName("Unknown Location");
    }
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    setLocationName("Error retrieving location");
  }
};

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ lat: latitude, lon: longitude });
        fetchLocationName(latitude, longitude); // 🔁 Add this line
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

      {locationName && (
      <p className="text-lg text-gray-800 mt-2">📍 {locationName}</p>
    )}

      <div className="mt-6">
        {location && <MapView lat={location.lat} lon={location.lon} />}

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
