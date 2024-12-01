import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import '../HomeBrand/brand.css';
import Brand from '../../../models/Brand';

type HomeBrandProps = {
  brands: Brand[]; // Nhận danh sách các nhãn hiệu
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function HomeBrand({ brands }: HomeBrandProps) {
  // Navigation
  const navigation = useNavigate();

  // Handle click khi chọn nhãn hiệu
  const handleBrandClick = (brandId: number) => {
    navigation(`/products?brands=${brandId}`);
  };

  // Cấu hình slider
  const settings = {
    dots: false,
    infinite: true, // Cho phép cuộn vô hạn
    speed: 500,
    slidesToShow: 6, // Hiển thị 6 thương hiệu trên desktop
    slidesToScroll: 3, // Cuộn 1 thương hiệu mỗi lần
    autoplay: true, // Tự động cuộn
    autoplaySpeed: 6000, // Mỗi 6 giây cuộn qua trái
    arrows: false,
    draggable: true, // Cho phép kéo thanh trượt
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 4, // Hiển thị 4 thương hiệu trên tablet
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 4, // Hiển thị 4 thương hiệu trên mobile
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {brands.map((brand, index) => (
        <div
          key={index}
          className="brand"
          onClick={() => handleBrandClick(brand.id)} // Gọi hàm xử lý khi click
          style={{ cursor: 'pointer' }} // Đổi con trỏ thành ngón tay chỉ
        >
          <img
            src={`${BASE_URL}/${brand.image}`}
            alt={brand.name}
            className="brandImage"
          />
        </div>
      ))}
    </Slider>
  );
}
