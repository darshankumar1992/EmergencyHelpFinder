import React, { useEffect, useRef } from "react";

function CanvasMap({ lat, lon }) {
  const canvasRef = useRef(null);

  // Mock emergency services (you could fetch real data from an API if needed)
  const emergencyCenters = [
    { name: "City Hospital", dx: -80, dy: -40 },
    { name: "Police Station", dx: 100, dy: 60 },
    { name: "Fire Department", dx: -60, dy: 90 },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    ctx.fillStyle = "#e0f7fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw user location
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = "14px Arial";
    ctx.fillText(`You (${lat.toFixed(2)}, ${lon.toFixed(2)})`, centerX + 12, centerY);

    // Draw emergency service markers
    emergencyCenters.forEach((place) => {
      const x = centerX + place.dx;
      const y = centerY + place.dy;

      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, 2 * Math.PI);
      ctx.fill();

      ctx.font = "13px Arial";
      ctx.fillText(place.name, x + 10, y + 4);
    });
  }, [lat, lon]);

  return (
    <canvas
      ref={canvasRef}
      width={600}
      height={300}
      className="mx-auto border mt-4"
    ></canvas>
  );
}

export default CanvasMap;
