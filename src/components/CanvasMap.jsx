import React, { useEffect, useRef } from "react";

function CanvasMap({ lat, lon }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#e0f7fa";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Marker for location
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = "16px Arial";
    ctx.fillText(`You (${lat.toFixed(2)}, ${lon.toFixed(2)})`, canvas.width / 2 + 15, canvas.height / 2);
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
