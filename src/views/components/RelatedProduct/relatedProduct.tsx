import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import SkeletonProductItem from "../Product/SkeletonProductItem";
import ProductItem from "../Product/ProductItem";
import Product from "../../../models/Product";
import { Row, Col } from "react-bootstrap";
import ConfigValue from "../../../configs/ConfigValue";
import "./relatedProduct.css";
import LanguageContext from "../../../configs/LanguageConfig";

type RelatedProductsProps = {
  relatedProductsData: Product[];
  loading: boolean;
};

const LIMIT = ConfigValue.RELATED_PRODUCT_LIMIT;

const RelatedProduct = ({ relatedProductsData, loading }: RelatedProductsProps) => {
  const language = useContext(LanguageContext).language
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="related-products">
      <h2>{language.RELATED_PRODUCTS}</h2>
      {!isMobile && (
        <Swiper
          slidesPerView={4}
          slidesPerGroup={2}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            768: { slidesPerView: 4, slidesPerGroup: 2 },
            1024: { slidesPerView: 4, slidesPerGroup: 2 },
          }}
        >
          {loading &&
            Array(LIMIT)
              .fill(0)
              .map((_, index) => (
                <SwiperSlide key={index}>
                  <SkeletonProductItem />
                </SwiperSlide>
              ))}
          {!loading &&
            relatedProductsData.map((product, index) => (
              <SwiperSlide style={{padding:"20px 10px"}} key={`${product.id}-${index}`}>
                <ProductItem data={product} />
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
            relatedProductsData.map((product, index) => (
              <Col key={`${product.id}-${index}`} xs={6} className="mb-3">
                <ProductItem data={product} />
              </Col>
            ))}
        </Row>
      )}
    </div>
  );
};

export default RelatedProduct;
