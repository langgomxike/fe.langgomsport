import { useCallback, useEffect, useState } from "react";
import "./product-detail.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import Product from "../../../models/Product";
import ProductDetailSkeleton from "./ProductDetailSkeleton";
import ACart from "../../../apis/ACart";
import Order from "../../../models/Order";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import ConfigValue from "../../../configs/ConfigValue";

type ProductDetailProps = {
  detailData: Product | undefined;
  loading: boolean;
};

type CartItem = {
  quantity: number;
  variantId: number;
};

type VariantSize = {
  id: number;
  size: string;
  quantity: number;
};

const SECRET_KEY = "langgomsport";
const expires = ConfigValue.CART_COOKIE_EXPRIRATION_LIMIT

export default function ProductInfo({
  detailData,
  loading,
}: ProductDetailProps) {
  const navigate = useNavigate();
  // states
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(-1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [variantsSize, setVariantsSize] = useState<VariantSize[]>([]);
  const [order, setOrder] = useState<Order>();

  // hendler

  const addVariant = (newVariant: VariantSize) => {
    setVariantsSize((prevVariants) => {
      // Kiểm tra xem size mới có trùng với biến thể nào không
      const isSizeExist = prevVariants.some(
        (variant) => variant.size === newVariant.size
      );

      // Nếu size đã tồn tại, bỏ qua thêm biến thể
      if (isSizeExist) {
        return prevVariants;
      }

      // Nếu size chưa tồn tại, thêm biến thể mới
      return [...prevVariants, newVariant];
    });
  };

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

  // Hàm định dạnh lại số cho giá tiền
  function formatPrice(price: number) {
    return price
      .toLocaleString("vi-VN", { style: "currency", currency: "VND" })
      .replace("₫", "đ");
  }

  // Tình giá tiền từ giảm giá nếu có
  function calculateDiscountedPrice(price: number, discount: number) {
    if (!discount) return null; // Nếu không có discount, trả về null
    const discountedPrice = price - (price * discount) / 100;
    return formatPrice(discountedPrice);
  }

  // Hàm thêm sản phẩm vào giỏ hàng
  const addToCart = useCallback(() => {
    let selectedVariant = null;

    if(detailData){
      if (selectedSize && selectedColor) {
        // Tìm variant theo cả size và màu
        selectedVariant = detailData.variants?.find(
          (variant) =>
            variant.size.id === selectedSize &&
            variant.color.color === selectedColor
        );
      } else if (selectedSize) {
        // Nếu không có màu, chỉ tìm theo size
        selectedVariant = detailData.variants?.find(
          (variant) => variant.size.id === selectedSize
        );
      } else if (selectedColor) {
        // Nếu không có size, chỉ tìm theo màu
        selectedVariant = detailData.variants?.find(
          (variant) => variant.color.color === selectedColor
        );
      } else {
        // Nếu không có gì chọn, chọn variant đầu tiên (hoặc thông báo lỗi nếu cần)
        console.log("Chưa chọn gì cả!");
      }
    }
    

    if (!selectedVariant) {
      console.warn("No valid variant found");
      return;
    }

    const item: CartItem = {
      quantity,
      variantId: selectedVariant.id,
    };

    // Lấy dữ liệu từ giỏ hàng nếu có từ cookie
    const existingCart = Cookies.get("cart");

    let cart: CartItem[] = existingCart ? JSON.parse(existingCart) : [];
    // let cart: CartItem[] = existingCart
    // ? JSON.parse(CryptoJS.AES.decrypt(existingCart, SECRET_KEY).toString(CryptoJS.enc.Utf8))
    // : [];

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
    const index = cart.findIndex((cartItem) => {
      return cartItem.variantId === item.variantId;
    });

    // Nếu sản phẩm đã tồn tại, tăng số lượng
    if (index > -1) {
      cart[index].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    // Cập nhật lại giỏ hàng trong cookie
    // Mã hóa giỏ hàng trước khi lưu vào cookie
    // const encryptedCart = CryptoJS.AES.encrypt(JSON.stringify(cart), SECRET_KEY).toString();
    Cookies.set("cart", JSON.stringify(cart), { expires: expires });

    // Chuyển hướng đến màn hình giỏ hàng
    navigate("/cart");
  }, [selectedSize, selectedColor, quantity, detailData]);

  // effects
  useEffect(() => {
    if (detailData && detailData.variants) {
      detailData.variants.forEach((item) => {
        const newVariant: VariantSize = {
          id: item.size.id,
          size: item.size.size,
          quantity: item.quantity,
        };
        addVariant(newVariant);
      });
    }

    console.log(detailData);
  }, [detailData]);

  // render
  return (
    <div>
      {loading && <ProductDetailSkeleton />}
      {!loading && detailData && (
        <div>
          <h1 className="detail-title">{detailData.name}</h1>

          <div className="detail-header-info">
            <div>
              <span className="header-info-title">Thương hiệu: </span>
              <span>{detailData.brand?.name}</span>
            </div>
            <div>
              <span>|</span>
            </div>
            <div>
              <span className="header-info-title">Mã SP: </span>
              <span>{detailData.code}</span>
            </div>
          </div>

          <hr />
          {/* Product price */}
          <div className="detail-product-price">
            <span className="price-title">Giá:</span>
            {detailData.discount > 0 && (
              <>
                <del className="product-price-compare">
                  {formatPrice(detailData.price)}
                </del>
                <span className="product-price-main">
                  {calculateDiscountedPrice(
                    detailData.price,
                    detailData.discount
                  )}
                </span>
                <span className="price-precent">(-{detailData.discount}%)</span>
              </>
            )}
            {detailData.discount <= 0 && (
              <>
                <span className="product-price-main">
                  {formatPrice(detailData.price)}
                </span>
              </>
            )}
          </div>

          {/* Product sizes */}
          <div className="detail-product-size">
            <span className="size-title">Kích thước</span>
            <div className="size-container">
              {variantsSize &&
                variantsSize.map((item) => (
                  <div
                    key={item.id}
                    className={`size-item ${
                      selectedSize === item.id && item.quantity > 0
                        ? "active"
                        : ""
                    } ${item.quantity <= 0 ? "disable" : ""}`}
                    onClick={() => handleSelectSize(item.id)}
                  >
                    {item.size}
                  </div>
                ))}
            </div>
            {/* <span className="titleWarming">Vui lòng chọn kích thước</span> */}
          </div>
        </div>
      )}

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
          <div
            className="btn-detail btn-add-to-cart"
            onClick={() => addToCart()}
          >
            Thêm vào giỏ hàng
          </div>
          <div className="btn-detail btn-heart">
            <FaHeart className="wishlist-icon" />
          </div>
        </div>
        <div className="btn-detail btn-order">Đặt hàng</div>
      </div>
    </div>
  );
}
