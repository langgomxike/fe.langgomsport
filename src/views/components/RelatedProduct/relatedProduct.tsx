import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./relatedProduct.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductItem from "../Product/ProductItem";
import Product from "../../../models/Product";
import SkeletonProductItem from "../Product/SkeletonProductItem";
import { Col, Row } from "react-bootstrap";
import ConfigValue from "../../../configs/ConfigValue";

type RealatedProductsProps = {
  relatedProductsData: Product[];
  loading: boolean
}

const LIMIT = ConfigValue.RELATED_PRODUCT_LIMIT;

const RelatedProduct = ({relatedProductsData, loading}:RealatedProductsProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const settings = {
    // trên máy tính
    dots: true,
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

  useEffect(() => {
    // Kiểm tra kích thước ban đầu
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Lắng nghe sự thay đổi kích thước màn hình
    window.addEventListener("resize", handleResize);

    // Dọn dẹp event listener khi component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  return (
    <div className="related-products">
      <h2>SẢN PHẨM LIÊN QUAN</h2>
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
     {!loading && relatedProductsData.map((product) => (
            <div key={product.id}>
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
      {!loading && relatedProductsData.map((product) => (
            <Col key={product.id} xs={6} className="mb-3">
              <ProductItem data={product}/>
              </Col>
            ))
          }
      </Row>
      }
    </div>
  );
};

export default RelatedProduct;
