import React from "react";
import "./productItem.css";
import ProductDTO from "../../../dtos/ProductDTO";

type ProductIemProps = {
    data: ProductDTO
};

export default function ({data}:ProductIemProps) {
   // handle
    function formatPrice(price: number) {
        return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replace('₫', 'đ');
    }
  return (
    <div className="product-item">
      <div className="product-image">
        <img
          className="img-fluid img-main"
          src={data.files[0].filePath}
          alt=""
        />
        <img
          className="img-fluid img-sub"
          src={data.files[1].filePath}
          alt=""
        />
        {/*<div className="product-sale">*/}
        {/*  <span>50%</span>*/}
        {/*</div>*/}
      </div>
      <h3 className="product-title">
        <a href={"#"} title={data.product.name}>
            {data.product.name}
        </a>
      </h3>
      <div className="product-price">
        <span>{formatPrice(data.product.price)}</span>
        {/*<del>1,953,818₫</del>*/}
      </div>
      <div className="product-bottom"></div>
    </div>
  );
}
