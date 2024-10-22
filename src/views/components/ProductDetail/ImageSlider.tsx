import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type ImageSliderProps = {
  images: string[];
  onImageClick: (image: string) => void;
};

const ImageSlider = ({ images, onImageClick }: ImageSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 3) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* Nút Prev */}
        <FaChevronLeft onClick={handlePrev}  aria-disabled={currentIndex === 0}/>

      {/* Hiển thị 3 ảnh */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`image-${index}`}
            style={{ width: "100px", height: "100px", margin: "0 5px" }}
            onClick={() => onImageClick(image)}
          />
        ))}
      </div>

      {/* Nút Next */}
        <FaChevronRight onClick={handleNext} aria-disabled={currentIndex >= images.length - 3}/>
    </div>
  );
};

export default ImageSlider;
