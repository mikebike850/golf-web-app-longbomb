import React from "react";
import "./PictureAlbum.css";

function PictureAlbum() {
  const images = [
    "/album1.jpg",
    "/album2.jpg",
    "/album3.jpg",
    "/album4.jpg",
  ];

  return (
    <div className="picture-album">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Album ${index + 1}`} />
      ))}
    </div>
  );
}

export default PictureAlbum;
