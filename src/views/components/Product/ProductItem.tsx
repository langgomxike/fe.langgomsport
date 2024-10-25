import React from "react";
import "./productItem.css";
import Product from "../../../models/Product";
import { Link } from "react-router-dom";

type ProductIemProps = {
  data: Product;
};

const BASE_URL = process.env.REACT_APP_BASE_URL

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

  const createSlug = (name:string) => {
    return name
      .toLowerCase() // Chuyển về chữ thường
      .replace(/[^a-z0-9\s-]/g, '') // Loại bỏ các ký tự đặc biệt
      .replace(/\s+/g, '-') // Thay khoảng trắng bằng dấu gạch ngang
      .trim();
  };

  //ui
  return (
    <div className="product-item">
      <Link to={`detail/${createSlug(data.name)}`}  state={{ id: data.id, name: data.name }} title={data.name}>
        <div className="product-image">
           <img
            className="img-fluid img-main"
            src={`${BASE_URL}/${data.files[0].filePath}`}
            alt=""
          />
          <img
            className="img-fluid img-sub"
            src={`${BASE_URL}/${data.files[1].filePath}`}
            alt=""
          /> 
          {data.discount > 0 && data.discount !== null && (
            <div className="product-sale">
              <span>{data.discount}%</span>
            </div>
          )}
        </div>
      </Link>
      <h3 className="product-title">
        <Link to={`detail/${createSlug(data.name)}`}  state={{ id: data.id, name: data.name }} title={data.name}>
          {data.name}
        </Link>
      </h3>
      <div className="product-price">
        <span>
          {(data.discount > 0 && data)
            ? calculateDiscountedPrice(
                  data.price,
                  data.discount
                )
            : formatPrice(data.price)}
        </span>

        <del className={`${data.discount > 0? "" : "hidden-price"}`}>{formatPrice(data.price)}</del>
      </div>
      <div className="product-bottom"></div>
    </div>
  );
}
