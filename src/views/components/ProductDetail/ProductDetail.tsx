import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import "./product-detail.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";

const sizes = [
  {
    id: 1,
    name: "41",
  },
  {
    id: 2,
    name: "42",
  },
  {
    id: 3,
    name: "43",
  },
  {
    id: 4,
    name: "44",
  },
];

export default function () {
  // states
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(-1);

  // hendler

  // Hàm xử lý khi nhấn nút tăng
  const handleIncrease = () => {
    setQuantity((prev) => prev + 1); // Tăng giá trị lên 1
  };

  // Hàm xử lý khi nhấn nút giảm
  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Giảm giá trị, tối thiểu là 1
  };

  // Hàm xử lý khi nhập thủ công vào input
  const handleChange = (e: any) => {
    const value = e.target.value;

    // Cho phép xóa toàn bộ giá trị (để nhập lại)
    if (value === "" || /^[0-9]*$/.test(value)) {
      setQuantity(parseInt(value, 10));
    }
  };

  // Active selected size
  const handleSelectSize = (size: number) => {
    setSelectedSize((prevSize) => (prevSize === size ? -1 : size));
  };

  // render
  return (
    <div>
      <h1 className="detail-title">
        Cyclone 2 | Giày Chạy Bộ Topo Athletics Cyclone 2 - Blue/Aqua
      </h1>

      <div className="detail-header-info">
        <div>
          <span className="header-info-title">Thương hiệu: </span>
          <span>Topo Athletics</span>
        </div>
        <div>
          <span>|</span>
        </div>
        <div>
          <span className="header-info-title">Mã SP: </span>
          <span>Cyclone 2 - Blue/Aqua</span>
        </div>
      </div>

      <hr />
      {/* Product price */}
      <div className="detail-product-price">
        <span className="price-title">Giá:</span>
        <del className="product-price-compare">1,561,091₫</del>
        <span className="product-price-main">1,092,764₫</span>
        <span className="price-precent">(-30%)</span>
      </div>

      {/* Product sizes */}
      <div className="detail-product-size">
        <span className="size-title">Kích thước</span>
        <div className="size-container">
          {sizes.map((size) => (
            <div
              key={size.id}
              className={`size-item ${selectedSize === size.id ? "active" : ""}`}
              onClick={() => handleSelectSize(size.id)}
            >
              {size.name}
            </div>
          ))}
        </div>
      </div>

      {/* Đặt hàng */}
      <div className="detail-product-action">
        <div className="add-to-cart-block">
          <div className="quantity">
            <div className="btn-quantity btn-minus" onClick={handleDecrease}>
              <FiMinus />
            </div>
            <input
              className="input-quantity"
              type="number"
              value={quantity}
              onChange={handleChange}
              step={1}
              min={1}
              inputMode="numeric"
              autoComplete="off"
            />
            <div className="btn-quantity btn-plus" onClick={handleIncrease}>
              <FiPlus />
            </div>
          </div>
          <div className="btn-detail btn-add-to-cart">Thêm vào giỏ hàng</div>
          <div className="btn-detail btn-heart">
            <FaHeart className="wishlist-icon" />
          </div>
        </div>
        <div className="btn-detail btn-order">Đặt hàng</div>
      </div>
    </div>
  );
}
