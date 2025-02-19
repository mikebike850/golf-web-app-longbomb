import React from "react";
import "./PictureAlbum.css";

function PictureAlbum() {
  return (
    <div className="picture-album">
      {/* Add your images here */}
      <img src="path/to/image1.jpg" alt="Image 1" />
      <img src="path/to/image2.jpg" alt="Image 2" />
      <img src="path/to/image3.jpg" alt="Image 3" />
      {/* Add more images as needed */}
    </div>
  );
}

export default PictureAlbum;