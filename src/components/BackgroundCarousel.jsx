import React, { useState, useEffect } from "react";
import "./BackgroundCarousel.css";

function BackgroundCarousel() {
  // List of background images (ensure these exist in your public folder)
  const images = ["/background1.jpg", "/background2.jpg", "/background3.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const message = "This is where updates will be displayed";

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`background-carousel background-carousel-image-${currentIndex}`}
      style={{ backgroundImage: `url(${images[currentIndex]})` }}
    >
      <div className="carousel-description">
        <h2>Welcome to the Golf Web App</h2>
        <p>Track your scores, participate in challenges, and more!</p>
      </div>
      <div className="carousel-message">
        {message}
      </div>
    </div>
  );
}

export default BackgroundCarousel;