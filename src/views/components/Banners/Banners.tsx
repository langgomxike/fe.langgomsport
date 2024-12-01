
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import "./banner.css"

type BannerProps = {
  banners: { image: string; link: string }[];
};

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Banners({ banners }: BannerProps) {
  return (
    <Swiper
      spaceBetween={30}
      loop={banners.length > 1}
      autoplay={{ delay: 10000, disableOnInteraction: false }}
      pagination={{
        clickable: true
      }}
      modules={[Autoplay, Pagination]}
      draggable={banners.length > 1}
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div className="banner">
            <Link to={banner.link} target="_self">
              <img
                src={`${BASE_URL}/${banner.image}`}
                alt={`Banner ${index}`}
                className="bannerImage"
                onDragStart={(e) => e.preventDefault()} // Ngăn kéo ảnh
              />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}