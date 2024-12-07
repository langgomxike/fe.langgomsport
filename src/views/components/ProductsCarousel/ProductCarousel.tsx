import { Swiper, SwiperSlide } from 'swiper/react';
import { useMediaQuery } from 'react-responsive';
import ConfigValue from '../../../configs/ConfigValue';
import SkeletonProductItem from '../Product/SkeletonProductItem';
import ProductItem from '../Product/ProductItem';
import { Col, Row } from 'react-bootstrap';
import 'swiper/swiper-bundle.css';
import Product from '../../../models/Product';

type ProductCarouselProps = {
  productList: Product[];
  loading: boolean;
};

const LIMIT = ConfigValue.PRODUCT_CAROUSEL_LIMIT;

export default function ProductCarousel({ productList, loading }: ProductCarouselProps) {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <div style={{padding: 10}}>
      {!isMobile && (
        <Swiper
          slidesPerView={4} // Hiển thị 4 sản phẩm trên desktop
          slidesPerGroup={2} // Cuộn 2 sản phẩm mỗi lần
          loop={false}
        >
          {loading &&
            Array(LIMIT)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <div className="product-item">
                    <SkeletonProductItem />
                  </div>
                </SwiperSlide>
              ))}

          {!loading &&
            productList.map((product, index) => (
              <SwiperSlide key={`${product.id}-${index}`}>
                 <div className='swiper-products'>
                    <ProductItem data={product} />
                 </div>
              </SwiperSlide>
            ))}
        </Swiper>
      )}

      {isMobile && (
        <Row>
          {loading &&
            Array(LIMIT)
              .fill(0)
              .map((_, index) => (
                <Col key={index} xs={6} className="mb-3">
                  <SkeletonProductItem />
                </Col>
              ))}
          {!loading &&
            productList.map((product, index) => (
              <Col key={`${product.id}-${index}`} xs={6} className="mb-3">
                <ProductItem data={product} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
}
