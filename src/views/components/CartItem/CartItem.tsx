import { Link } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import { useMediaQuery } from "react-responsive";
import Variant from "../../../models/Variant";
import CartCookie from "../../../models/CartCookies";
import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";

type CartItemProps = {
  cartVariant: Variant;
  quantity: number;
  onDeleteCartItem: (variantId: number) => void;
  onChangeQuantity: (variantId: number, newQuantity: number) => void;
}

const URL = process.env.REACT_APP_BASE_URL

export default function CartItem({cartVariant, quantity ,onDeleteCartItem, onChangeQuantity}: CartItemProps) {
  const isMobile = useMediaQuery({ maxWidth: 992 }); // Kiểm tra màn hình nhỏ hơn 768px (di động)
  // handler
  function formatPrice(price: number) {
    if(price) {
      return price
        .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        .replace("₫", "đ");
    }
    return 0
  }


  // Gọi hàm xóa khi nhấn vào nút xóa
  const handleDelete = () => {
    onDeleteCartItem(cartVariant.id);
  };
  return (
    <>
      <tr className="item-cart">
        {/* Product image */}
        <td>
          <div className="cart-item-image">
            { cartVariant.images?.length &&
              <img
                src={`${URL}/${cartVariant.images[0]?.path}`}
                alt="Product" loading="lazy"
              />

            }
          </div>
        </td>

        {/* Product name, price */}
        {!isMobile ? (
          <>
            {/* Product name, price on destop */}
            <td width={"33%"}>
            <h3>
              <Link to="#" className="cart-item-name">
                {cartVariant.product?.name}
              </Link>
              </h3>
            </td>
            <td>
              <div className="text-center">
                <span className="cart-item-price">{formatPrice(cartVariant.price > 0  ? cartVariant.price : cartVariant.product?.descPrice ?? 0)}
                </span>
              </div>
            </td>
          </>
        ) : (
          <>
            {/* Product name, price on mobile */}
            <td>
              <h3>
                <Link to="#" className="cart-item-name">
                  {cartVariant.product?.name}
                </Link>
              </h3>
              <div>
                <span className="cart-item-price-total-title">Giá: </span>
                <span className="cart-item-price-total">{formatPrice(cartVariant.price > 0  ? cartVariant.price : cartVariant.product?.descPrice ?? 0)}</span>
              </div>
            </td>
          </>
        )}

        {/* Input quatity and delete button */}
        {!isMobile ? (
          <>
            {/* Input quantity on desktop */}
            <td>
              <div className="item-cart-input-quantity">
                <input
                  type="number"
                  value={quantity}
                  min={1}
                  inputMode="numeric"
                  autoComplete="off"
                  onChange={(e) => {
                    // Đảm bảo giá trị >= 1
                    const newQuantity = Math.max(Number(e.target.value), 1);
                    // Cập nhật cookie và state giỏ hàng
                    onChangeQuantity(cartVariant.id, newQuantity);
                  }}
                />
              </div>
            </td>

            {/* Total price on desktop */}
            <td>
              <div className="text-center">
                <span className="cart-item-price">{formatPrice((cartVariant.price > 0 ? cartVariant.price : cartVariant.product?.descPrice ?? 0) * quantity)}</span>
              </div>
            </td>

            {/* Button delete on desktop */}
            <td>
              <div className="btn-delete"  onClick={handleDelete}>
                <FiTrash2 className="btn-delete-icon" />
              </div>
            </td>
          </>
        ) : (
          <td>
            {/* Input quantity on moblie */}
            <div className="item-cart-input-quantity">
              <input
                type="number"
                value={quantity}
                min={1}
                inputMode="numeric"
                autoComplete="off"
                onChange={(e) => {
                  // Đảm bảo giá trị >= 1
                  const newQuantity = Math.max(Number(e.target.value), 1);
                  // Cập nhật cookie và state giỏ hàng
                  onChangeQuantity(cartVariant.id, newQuantity);
                }}
              />
            </div>
            {/* Button delete on moblie */}
            <div className="btn-delete mt-2" onClick={handleDelete}>
              <FiTrash2 className="btn-delete-icon" />
            </div>
          </td>
        )}
      </tr>
    </>
  );
}
