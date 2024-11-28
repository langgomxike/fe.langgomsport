import React from 'react'
import Banner from '../../../models/Banner'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
import "./banner.css"

type BannerProps = {
    banners: Banner[]
}

const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function Banners({banners}: BannerProps) {
    const settings = {
        dots: banners.length > 1,
        infinite: banners.length > 1,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: banners.length > 1, 
        autoplaySpeed: 10000,
        arrows: false,
        draggable: banners.length > 1,
      };

  return (
    <Slider {...settings}>
    {banners.map((banner, index) => (
      <div key={index} className="banner">
          <Link to={banner.link} target="_self"> {/* Redirect trên cùng cửa sổ */}
            <img
              src={`${BASE_URL}/${banner.image}`}
              alt={`Banner ${index}`}
              className="bannerImage"
            />
          </Link>
      </div>
    ))}
  </Slider>
  )
}