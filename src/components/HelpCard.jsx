import React, { useEffect, useRef } from "react";

function HelpCard({ help }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.classList.add("visible");
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="opacity-0 translate-y-12 transition-all duration-700 ease-in-out bg-white shadow-md p-4 w-80 mx-auto rounded help-card"
    >
      <h3 className="text-xl font-semibold">{help.name}</h3>
      <p>Distance: {help.dist}</p>
      <p>Call: {help.contact}</p>
    </div>
  );
}

export default HelpCard;
