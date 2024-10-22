import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./relatedProduct.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  discount: number;
  price: string;
  originalPrice: string;
}

const RelatedProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const fetchedProducts: Product[] = [
        {
          id: 1,
          name: "Giày Chạy Bộ Nam HOKA Bondi 8",
          imageUrl:
            "https://pos.nvncdn.com/be3294-43017/ps/20230411_VmJ2SfyO69.jpeg",
          discount: 40,
          price: "2,159,400",
          originalPrice: "3,599,000",
        },
        {
          id: 2,
          name: "Giày Chạy Bộ Nam HOKA Rocket X 2",
          imageUrl: "./images/giay_the_thao_nam_1.jpg",
          discount: 15,
          price: "5,095,750",
          originalPrice: "5,995,000",
        },
        {
          id: 3,
          name: "Giày Chạy Bộ Nam TOPO Specter",
          imageUrl:
            "https://pos.nvncdn.com/be3294-43017/ps/20230411_VmJ2SfyO69.jpeg",
          discount: 30,
          price: "2,555,000",
          originalPrice: "3,650,000",
        },
        {
          id: 4,
          name: "Giày Chạy Bộ Nam TOPO Specter 2",
          imageUrl: "./images/giay_the_thao_nam_1.jpg",
          discount: 30,
          price: "2,555,000",
          originalPrice: "3,650,000",
        },
        {
          id: 5,
          name: "Giày Chạy Bộ Nam TOPO Phantom",
          imageUrl:
            "https://pos.nvncdn.com/be3294-43017/ps/20230411_VmJ2SfyO69.jpeg",
          discount: 30,
          price: "2,800,000",
          originalPrice: "4,000,000",
        },
        {
          id: 6,
          name: "Giày Chạy Bộ Nam HOKA Clifton 9",
          imageUrl: "./images/giay_the_thao_nam_1.jpg",
          discount: 20,
          price: "2,999,000",
          originalPrice: "3,750,000",
        },
      ];
      setProducts(fetchedProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const settings = {
    // trên máy tính
    dots: true,
    infinite: true,
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
        {isLoading
          ? Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="product-item">
                  <Skeleton height={200} />
                  <div className="product-info">
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                  </div>
                </div>
              ))
          : products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.imageUrl} alt={product.name} />
                <div className="product-info">
                  <p>{product.name}</p>
                  <p className="discount-price">{product.price} VNĐ</p>
                  <p className="original-price">{product.originalPrice} VNĐ</p>
                </div>
              </div>
            ))}
      </Slider>
    </div>
  );
};

export default RelatedProduct;
