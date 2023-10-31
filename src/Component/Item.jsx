// src/components/Item.jsx
import React, { useState, useEffect } from "react";

const Item = ({ item }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const images = item.images;

  useEffect(() => {
    let interval;

    if (isHovered) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
    } else {
      // Reset to the first image when not hovered
      setCurrentImageIndex(0);
    }

    return () => clearInterval(interval);
  }, [isHovered, images]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="item-box bg-light "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="item-image vh-100px">
        <img
          src={`/images/${item.images[currentImageIndex]}`}
          alt={item.name}
        />
      </div>
      {/* Add space and horizontal line here */}
      <div className="my-1">
        <hr className="my-1" style={{ borderTop: "2px solid #777" }} />
      </div>

      <div
        className="item-details"
        title={`Name: ${item.name}, Quantity: ${item.quantity}, Price: ${item.price}`}
      >
        <h3>{item.name}</h3>
        <h4>{item.quantity}</h4>
        <h4>{item.price}</h4>
        {/* Add more item details here */}
      </div>
    </div>
  );
};

export default Item;
