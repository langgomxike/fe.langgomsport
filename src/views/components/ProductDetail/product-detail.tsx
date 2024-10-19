import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import RootLayout from "../../layouts/RootLayout";
import { Col, Container, Row } from "react-bootstrap";
import "./product-detail.css";
import { FiHeart, FiMinus, FiPlus } from "react-icons/fi";
export default function () {
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
          <div className="size-item active">41</div>
          <div className="size-item">XXL</div>
          <div className="size-item">43</div>
          <div className="size-item">44</div>
          <div className="size-item">45</div>
        </div>
      </div>

      {/* Đặt hàng */}
      <div className="detail-product-action">
        <div className="add-to-cart-block">
          <div className="quantity">
            <div className="btn-quantity btn-minus">
              <FiMinus />
            </div>
            <input
              className="input-quantity"
              type="number"
              step={1}
              min={1}
              inputMode="numeric"
              autoComplete="off"
            />
            <div className="btn-quantity btn-plus">
              <FiPlus />
            </div>
          </div>
          <div className="btn-detail btn-add-to-cart">Thêm vào giỏ hàng</div>
          <div className="btn-detail btn-heart">
            <FiHeart className="wishlist-icon" />
          </div>
        </div>
        <div className="btn-detail btn-order">Đặt hàng</div>
      </div>
    </div>
  );
}
