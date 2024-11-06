import { Link } from "react-router-dom";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";
import RootLayout from "../../layouts/RootLayout";
import "./cart.css";
import CartItem from "../../components/CartItem/CartItem";

export default function Cart() {
  // states

  // handlers

  // effects

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
              <CartItem />
            </tbody>
          </table>

          {/* Order */}
          <div className="row">
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
      </div>
    </RootLayout>
  );
}
