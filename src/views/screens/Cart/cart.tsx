import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";
import RootLayout from "../../layouts/RootLayout";
import "./cart.css";
import CartItem from "../../components/CartItem/CartItem";
import Cookies from "js-cookie";
import axios from "axios";
import ACart from "../../../apis/ACart";
import CartCookie from "../../../models/CartCookies";
import Variant from "../../../models/Variant";
import ConfigValue from "../../../configs/ConfigValue";
import CartItemSkeleton from "../../components/CartItem/CartItemSkeleton";
import FooterComponent from "../../components/Footer/Footer";

const expires = ConfigValue.CART_COOKIE_EXPRIRATION_LIMIT;

export default function Cart() {
  // states
  const [cartItems, setCartItems] = useState<CartCookie[]>([]);
  const [cartVariants, setCartVariants] = useState<Variant[]>([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  // handlers
  const getCartFromCookie = (): CartCookie[] => {
    const existingCart = Cookies.get("cart");
    return existingCart ? JSON.parse(existingCart) : [];
  };

  const deleteCartItem = useCallback(
    (cartVariantId: number) => {
      console.log("Xóa cart trong cookie");

      // Lấy dữ liệu giỏ hàng từ cookie
      const cart = getCartFromCookie();

      // Loại bỏ item có variantId trùng với cartVariantId
      const updatedCart = cart.filter(
        (cartItem) => cartItem.variantId !== cartVariantId
      );

      // Cập nhật lại giỏ hàng vào cookie
      Cookies.set("cart", JSON.stringify(updatedCart), { expires: expires });

      // Cập nhật lại giỏ hàng trong state
      setCartUpdated((prev) => !prev);
      setCartItems(updatedCart);
    },
    [cartUpdated]
  );

  // effects
  useEffect(() => {
    // Lấy giỏ hàng từ cookie
    const cart = getCartFromCookie();
    setCartItems(cart);
    console.log("existingCart", cart);

    ACart.getCartByVariantIds(
      cart,
      (data) => {
        setCartVariants(data);
      },
      setLoading
    );

    if (!cart.length) {
      console.warn("Không có sản phẩm nào trong giỏ hàng");
    }
  }, [cartUpdated]);

  //render
  return (
    <RootLayout>
      <div className="cart container">
        {/* Header */}
        <div className="header-container">
          {/* Breadcrumb */}
          <div className="breadcrumb-container">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to={ScreenNameConfig.HOME}>Home</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  <Link to={ScreenNameConfig.CART}>Giỏ hàng</Link>
                </li>
              </ol>
            </nav>
            <hr></hr>
          </div>

          {/* Title of layout */}
          <h1 className="cart-header-title">Giỏ hàng</h1>
        </div>

        {/* Body */}
          <div className="body-container">
          <table className="table align-middle">
            <thead className="table-header">
              <tr className="text-center text-nowrap">
                <th scope="col">Hình ảnh</th>
                <th scope="col">Tên sản phẩm</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Thành tiền</th>
                <th scope="col">Xóa</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                   <CartItemSkeleton limit={1}/>
              ) : (
                <>
                {cartVariants &&
                  cartVariants.map((variant, index) => (
                    <CartItem
                      key={index}
                      cartVariant={variant}
                      onDeleteCartItem={deleteCartItem}
                    />
                  ))}
                </>
              )}
              
            </tbody>
          </table>

          {/* Order */}
          <div className="row orderContainer">
            <div className="col-12 col-md-6">
              <h3 className="titleInfomation">Thông tin đặt hàng</h3>
              <div className="inputInfo">
                <label>
                  Họ và tên <span className="text-danger">*</span>
                </label>
                <input type="text" />
              </div>

              <div className="inputInfo">
                <label>
                  Số điện thoại <span className="text-danger">*</span>
                </label>
                <input type="text" />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="order-container">
                <div className="order-total">
                  <h3>Tổnng tiền:</h3>
                  <span>1,000,000đ</span>
                </div>
                <div className="btn-order">Đặt hàng</div>
              </div>
            </div>
          </div>
        </div>
          <div className="empty-cart">
            <img
              src="/images/empty-product-list.png"
              alt=""
              width={100}
              height={100}
            />
            <span>Chưa có sản phẩm nào trong giỏ hàng</span>
          </div>


        
      </div>
      <FooterComponent/>
    </RootLayout>
  );
}
