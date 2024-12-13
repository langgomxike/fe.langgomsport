import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useNavigate } from 'react-router-dom';
import 'swiper/swiper-bundle.css';
import '../HomeBrand/brand.css';
import Brand from '../../../models/Brand';
import { Autoplay, Pagination } from 'swiper/modules';
import ConfigValue from '../../../configs/ConfigValue';
import { useMediaQuery } from 'react-responsive';

type HomeBrandProps = {
  brands: Brand[]; // Nhận danh sách các nhãn hiệu
};

const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function HomeBrand({ brands }: HomeBrandProps) {
  // Navigation
  const navigation = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
  // Handle click khi chọn nhãn hiệu


  return (
    <Swiper
      slidesPerView={4}
      autoplay={{
        delay: 6000, // Tự động cuộn sau 6 giây
        disableOnInteraction: false,
      }}
      loop={isMobile? brands.length > ConfigValue.HOME_BRAND_LIMIT_MOBILE : brands.length > ConfigValue.HOME_BRAND_LIMIT_DESKTOP} // Cho phép cuộn vô hạn
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
            style={{ cursor: 'pointer' }} // Đổi con trỏ thành ngón tay chỉ
          >
            <Link to={`/products?brands=${brand.id}`}>
            <img
              src={`${BASE_URL}/${brand.image}`}
              alt={brand.name}
              className="brandImage"
              onError={(e: any) => {
                e.target.src = '/images/image-default.png'; // Đường dẫn đến hình ảnh mặc định
              }}
            />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
