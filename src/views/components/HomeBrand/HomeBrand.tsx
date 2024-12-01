import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useNavigate } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import '../HomeBrand/brand.css';
import Brand from '../../../models/Brand';
import { Autoplay, Pagination } from 'swiper/modules';

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

  return (
    <Swiper
      slidesPerView={4}
      autoplay={{
        delay: 6000, // Tự động cuộn sau 6 giây
        disableOnInteraction: false,
      }}
      loop={true} // Cho phép cuộn vô hạn
      modules={[Autoplay]}
      breakpoints={{
        640: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 4,
        },
        1024: {
          slidesPerView: 6,
        },
      }}
    >
      {brands.map((brand, index) => (
        <SwiperSlide key={index}>
          <div
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
