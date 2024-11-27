import Slider from "react-slick";
import Product from "../../../models/Product"
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import ConfigValue from "../../../configs/ConfigValue";
import SkeletonProductItem from "../Product/SkeletonProductItem";
import ProductItem from "../Product/ProductItem";
import { Col, Row } from "react-bootstrap";

type ProductCarouselProps = {
    productList: Product[],
    loading: boolean,
}
const LIMIT = ConfigValue.PRODUCT_CAROUSEL_LIMIT;
export default function ProductCarousel({productList, loading}: ProductCarouselProps) {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const settings = {
    // trên máy tính
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    responsive: [
      {
        // trên mobile
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

    return (
        <div className="related-products">
          {!isMobile &&
          <Slider {...settings}>
          {loading && 
            Array(LIMIT)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="product-item">
                 <SkeletonProductItem />
              </div>
            ))
            }
         {!loading && productList.map((product, index) => (
                <div key={`${product.id}-${index}`}>
                  <ProductItem data={product}/>
                </div>
                ))
              }
          </Slider>
          }
    
          {isMobile &&
          <Row>
          {loading && 
          Array(LIMIT)
          .fill(0)
          .map((_, index) => (
            <Col key={index} xs={6} className="mb-3">
                <SkeletonProductItem/>
                </Col>
          ))
          }
          {!loading && productList.map((product, index) => (
                <Col key={`${product.id}-${index}`} xs={6} className="mb-3">
                  <ProductItem data={product}/>
                  </Col>
                ))
              }
          </Row>
          }
        </div>
      );
}