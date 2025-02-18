import React, { useState, useEffect } from "react";
import "./BackgroundCarousel.css";

function BackgroundCarousel() {
  // List of background images (ensure these exist in your public folder)
  const images = ["/background1.jpg", "/background2.jpg", "/background3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      className="background-carousel"
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    ></div>
  );
}

export default BackgroundCarousel;
