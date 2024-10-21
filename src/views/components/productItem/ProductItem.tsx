import React from "react";
import "./productItem.css";
import ProductFiles from "../../../models/ProductFiles";
import { Link } from "react-router-dom";

type ProductIemProps = {
  data: ProductFiles;
};

export default function ProductIem({ data }: ProductIemProps) {
  // handlers
  function formatPrice(price: number) {
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "đ");
  }

  function calculateDiscountedPrice(price: number, discount: number) {
    if (!discount) return null; // Nếu không có discount, trả về null
    const discountedPrice = price - (price * discount) / 100;
    return formatPrice(discountedPrice);
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
          {data.product.discount > 0 && data.product.discount !== null && (
            <div className="product-sale">
              <span>{data.product.discount}%</span>
            </div>
          )}
        </div>
      </Link>
      <h3 className="product-title">
        <Link to={`/about`} title={data.product.name}>
          {data.product.name}
        </Link>
      </h3>
      <div className="product-price">
        <span>
          {(data.product.discount > 0 && data.product)
            ? calculateDiscountedPrice(
                  data.product.price,
                  data.product.discount
                )
            : formatPrice(data.product.price)}
        </span>
        <del>{formatPrice(data.product.price)}</del>
      </div>
      <div className="product-bottom"></div>
    </div>
  );
}
