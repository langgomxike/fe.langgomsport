import React from "react";
import "./productItem.css";
import ProductDTO from "../../../dtos/ProductDTO";
import { Link } from "react-router-dom";

type ProductIemProps = {
  data: ProductDTO;
};

export default function ProductIem({ data }: ProductIemProps) {
  // handlers
  function formatPrice(price: number) {
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "đ");
  }

  //ui
  return (
    <div className="product-item">
      <Link to={`/detail`} state={data.product.id} title={data.product.name}>
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
          <div className="product-sale">
            <span>50%</span>
          </div>
        </div>
      </Link>
      <h3 className="product-title">
        <Link to={`/about`} title={data.product.name}>
          {data.product.name}
        </Link>
      </h3>
      <div className="product-price">
        <span>{formatPrice(data.product.price)}</span>
        <del>1,953,818₫</del>
      </div>
      <div className="product-bottom"></div>
    </div>
  );
}
