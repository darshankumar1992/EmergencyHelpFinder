import React, { useEffect, useState } from "react";

function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  return (
    <p className={`mb-2 ${isOnline ? "text-green-600" : "text-red-600"}`}>
      {isOnline ? "✅ You are online" : "❌ You are offline"}
    </p>
  );
}

export default NetworkStatus;
