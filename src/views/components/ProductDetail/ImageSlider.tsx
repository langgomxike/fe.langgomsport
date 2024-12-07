import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from 'swiper/modules';
import ImageVariant from "../../../models/ImageVariant";

const BASE_URL = process.env.REACT_APP_BASE_URL;

type ImageSliderProps = {
  images: ImageVariant[];
  onImageClick: (image: string) => void;
};

const ImageSlider = ({ images, onImageClick }: ImageSliderProps) => {

  return (
    <div className="slider-image">
      {/* Swiper slider */}
      <Swiper
        spaceBetween={10}
        slidesPerView={3}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 10 },
          1024: { slidesPerView: 5, spaceBetween: 15 },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${BASE_URL}/${image.path}`}
              alt={`image-${index}`}
              style={{
                width: "100px",
                height: "100px",
                margin: "0 5px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
              onClick={() => onImageClick(image.path)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
