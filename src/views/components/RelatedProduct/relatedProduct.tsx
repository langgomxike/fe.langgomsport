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

type RealatedProductsProps = {
  relatedProductsData: Product[];
  loading: boolean
}

const RelatedProduct = ({relatedProductsData, loading}:RealatedProductsProps) => {

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

  return (
    <div className="related-products">
      <h2>SẢN PHẨM LIÊN QUAN</h2>
      <Slider {...settings}>
      {loading && 
        Array(4)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="product-item">
             <SkeletonProductItem />
          </div>
        ))
        }
     { !loading && relatedProductsData.map((product) => (
            <div key={product.id}>
              <ProductItem data={product}/>
            </div>
            ))
          }
      </Slider>
    </div>
  );
};

export default RelatedProduct;
