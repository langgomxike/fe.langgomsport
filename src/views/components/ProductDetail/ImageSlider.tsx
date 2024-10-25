import React, { useState } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import File from "../../../models/File";

const BASE_URL = process.env.REACT_APP_BASE_URL;

type ImageSliderProps = {
  images: File[];
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


  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: false,
    centerMode: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
  };

  return (
    // <div style={{ display: "flex", alignItems: "center" }}>
    //   {/* Nút Prev */}
    //     <FaChevronLeft onClick={handlePrev}  aria-disabled={currentIndex === 0}/>

    //   {/* Hiển thị 3 ảnh */}
    //   <div style={{ display: "flex", justifyContent: "center" }}>
    //     {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
    //       <img
    //         key={index}
    //         src={`${BASE_URL}/${image.filePath}`}
    //         alt={`image-${index}`}
    //         style={{ width: "100px", height: "100px", margin: "0 5px" }}
    //         onClick={() => onImageClick(image.filePath)}
    //       />
    //     ))}
    //   </div>

    //   {/* Nút Next */}
    //     <FaChevronRight onClick={handleNext} aria-disabled={currentIndex >= images.length - 3}/>
    // </div>
    <div className="slider-image">
      <Slider {...settings}>
        {images.slice(currentIndex, currentIndex + 3).map((image, index) => (
          <div key={index}>
            <img
              key={index}
              src={`${BASE_URL}/${image.filePath}`}
              alt={`image-${index}`}
              style={{ width: "100px", height: "100px", margin: "0 5px", border: "1px solid #ccc"}}
              onClick={() => onImageClick(image.filePath)}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
