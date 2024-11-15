import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SweetAlert2 from "sweetalert2";
import ScreenNameConfig from "../../../configs/ScreenNameConfig";
import RootLayout from "../../layouts/RootLayout";
import "./cart.css";
import CartItem from "../../components/CartItem/CartItem";
import Cookies from "js-cookie";
import ACart from "../../../apis/ACart";
import CartCookie from "../../../models/CartCookies";
import Variant from "../../../models/Variant";
import ConfigValue from "../../../configs/ConfigValue";
import CartItemSkeleton from "../../components/CartItem/CartItemSkeleton";
import FooterComponent from "../../components/Footer/Footer";
import CartContext from "../../../configs/CartConfig";

const expires = ConfigValue.CART_COOKIE_EXPRIRATION_LIMIT;

export default function Cart() {
  //contexts
  const cartContext = useContext(CartContext);

  // states
  const [cartVariants, setCartVariants] = useState<Variant[]>([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const [fullname, setFullname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFullNameValid, setIsFullNameValid] = useState<null | boolean>(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState<null | boolean>(
    null
  );
  const [hasFullNameInput, setHasFullNameInput] = useState(false);
  const [hasPhoneNumberInput, setHasPhoneNumberInput] = useState(false);

  // Regex patterns
  const regexFullName = /^[a-zA-ZÀ-ỹ\s]{3,}$/i;
  const regexPhoneNumber = /^[0-9]{10,11}$/;

  // handlers
  const getCartFromCookie = (): CartCookie[] => {
    const existingCart = Cookies.get("cart");
    return existingCart ? JSON.parse(existingCart) : [];
  };

  // const deleteCartItem = useCallback(
  //   (cartVariantId: number) => {
  //     console.log("Xóa cart trong cookie");
  //
  //     // Lấy dữ liệu giỏ hàng từ cookie
  //     const cart = getCartFromCookie();
  //
  //     // Loại bỏ item có variantId trùng với cartVariantId
  //     const updatedCart = cart.filter(
  //       (cartItem) => cartItem.variantId !== cartVariantId
  //     );
  //
  //     // Cập nhật lại giỏ hàng vào cookie
  //     Cookies.set("cart", JSON.stringify(updatedCart), { expires: expires });
  //
  //     // Cập nhật lại giỏ hàng trong state
  //     setCartUpdated((prev) => !prev);
  //     setCartItems(updatedCart);
  //   },
  //   [cartUpdated]
  // );

  const updateCartQuantity = (variantId: number, newQuantity: number) => {
    // Lấy giỏ hàng từ cookie
    const cart = getCartFromCookie();

    // Cập nhật quantity nếu đúng variantId
    const updatedCart = cart.map((item) =>
      item.variantId === variantId
        ? { ...item, quantity: newQuantity }
        : item
    );

    // Lưu giỏ hàng cập nhật vào cookie
    Cookies.set("cart", JSON.stringify(updatedCart), { expires: expires });

    // Cập nhật lại state giỏ hàng
    setCartItems(updatedCart);
  };

  const handleOrderClick = () => {
    let valid = true;
    const cart = getCartFromCookie();

    if (!fullname || !regexFullName.test(fullname)) {
      setIsFullNameValid(false);
      valid = false;
    } else {
      setIsFullNameValid(true);
    }

    if (!phoneNumber || !regexPhoneNumber.test(phoneNumber)) {
      setIsPhoneNumberValid(false);
      valid = false;
    } else {
      setIsPhoneNumberValid(true);
    }

    if (valid) {
      ACart.placeOrder(
        fullname,
        phoneNumber,
        cartContext.items,
        (message) => {
          SweetAlert2.fire({
            title: "Đơn hàng đã được ghi nhận",
            text: "Nhân viên chúng tôi sẽ liên hệ quý khách sớm nhất có thể để xác nhận đơn.",
            icon: "success",
            confirmButtonText: "Đóng",
          }).then(() => {
            Cookies.remove("cart"); // Xóa giỏ hàng
            setCartItems([]); // Cập nhật lại giao diện

             // Lưu thông tin fullname và phoneNumber vào localStorage
              localStorage.setItem('fullname', fullname);
              localStorage.setItem('phoneNumber', phoneNumber);
            // setCartItems([]); // Cập nhật lại giao diện
          });
        },
        (error) => {
          SweetAlert2.fire({
            title: "Có lỗi trong quá trình ghi nhận đơn đặt hàng",
            text: "Xin thử lại hoặc liên hệ số 0371234567 để được hỗ trợ.",
            icon: "error",
            confirmButtonText: "Đóng",
          });
        }
      );
    }
  };

  // effects
  useEffect(() => {
    // Lấy giỏ hàng từ cookie
    // const cart = getCartFromCookie();
    // setCartItems(cart);

    console.log("existingCart", cartContext.items);

    ACart.getCartByVariantIds(
      cartContext.items,
      (data) => {
        setCartVariants(data);
      },
      setLoading
    );

    if (!cartContext.items.length) {
      console.warn("Không có sản phẩm nào trong giỏ hàng");
    }
  }, [cartContext.items]);

  useEffect(() => {
    // Kiểm tra fullname
    if (fullname.trim() !== "") {
      setIsFullNameValid(regexFullName.test(fullname));
    } else {
      setIsFullNameValid(null); // Trạng thái mặc định, không hiển thị gì
    }

    // Kiểm tra phoneNumber
    if (phoneNumber.trim() !== "") {
      setIsPhoneNumberValid(regexPhoneNumber.test(phoneNumber));
    } else {
      setIsPhoneNumberValid(null); // Trạng thái mặc định, không hiển thị gì
    }
  }, [fullname, phoneNumber]);

  function formatPrice(price: number) {
    if(price) {
      return price
        .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
        .replace("₫", "đ");
    }
    return 0
  }

  useEffect(() => {
    const calculateTotal = () => {
      const total = cartVariants.reduce((sum, variant) => {
        const cartItem = cartItems.find((item) => item.variantId === variant.id);
        if (cartItem) {
          const price = variant.price > 0 ? variant.price : variant.product?.descPrice || 0;
          return sum + price * cartItem.quantity;
        }
        return sum;
      }, 0);
      setTotalPrice(total);
    };

    calculateTotal();
  }, [cartItems, cartVariants]);

  useEffect(() => {
    // Đọc giá trị từ localStorage khi component được render
    const savedFullname = localStorage.getItem('fullname');
    const savedPhoneNumber = localStorage.getItem('phoneNumber');

    // Nếu có giá trị, set vào state
    if (savedFullname) {
      setFullname(savedFullname);
    }
    if (savedPhoneNumber) {
      setPhoneNumber(savedPhoneNumber);
    }
  }, []);

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
        {cartItems.length ? (
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
                <CartItemSkeleton limit={1} />
              ) : (
                <>
                {cartVariants &&
                  cartVariants.map((variant, index) => {
                    const cartItem = cartItems.find(
                      (item) => item.variantId === variant.id
                    );
                    return (
                    <CartItem  key={index}
                      cartVariant={variant}
                     quantity={cartItem?.quantity || 1}
                     onDeleteCartItem={deleteCartItem}
                     onChangeQuantity={updateCartQuantity}/>
                    )
                  })}
                </>
              )}
            </tbody>
          </table>
        ): (
          <div className="empty-cart">
          <img
            src="/images/empty-product-list.png"
            alt=""
            width={100}
            height={100}
          />
          <span>Chưa có sản phẩm nào trong giỏ hàng</span>
        </div>
        )
        }


          {/* Order */}
          {!loading &&
          <div className="row orderContainer">
            <div className="col-12 col-md-6">
              <h3 className="titleInfomation">Thông tin đặt hàng</h3>
              <div className="inputInfo">
                <label>
                  Họ và tên <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={fullname}
                  onChange={(e) => {
                    setFullname(e.target.value);
                    if (!hasFullNameInput) setHasFullNameInput(true); // Đánh dấu đã nhập
                  }}
                  className={`form-control ${
                    isFullNameValid === false && hasFullNameInput
                      ? "is-invalid"
                      : isFullNameValid === true
                      ? "is-valid"
                      : ""
                  }`}
                />
                {hasFullNameInput && isFullNameValid === false && (
                  <div className="text-danger">
                    Vui lòng nhập họ tên hợp lệ.
                  </div>
                )}
              </div>

              <div className="inputInfo">
                <label>
                  Số điện thoại <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  name="numberphone"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    if (!hasPhoneNumberInput) setHasPhoneNumberInput(true); // Đánh dấu đã nhập
                  }}
                  className={`form-control ${
                    isPhoneNumberValid === false && hasPhoneNumberInput
                      ? "is-invalid"
                      : isPhoneNumberValid === true
                      ? "is-valid"
                      : ""
                  }`}
                />
                {hasPhoneNumberInput && isPhoneNumberValid === false && (
                  <div className="text-danger">
                    Vui lòng nhập số điện thoại hợp lệ.
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="order-container">
                <div className="order-total">
                  <h3>Tổnng tiền:</h3>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <button
                disabled={cartItems.length === 0}
                className={cartItems.length === 0 ? "btn-order-disabled" : "btn-order"}
                onClick={handleOrderClick}
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
          }
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
      <FooterComponent />
    </RootLayout>
  );
}
