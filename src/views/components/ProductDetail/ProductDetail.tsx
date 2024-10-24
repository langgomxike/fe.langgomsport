import { useEffect, useState } from "react";
import "./product-detail.css";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa6";
import Product from "../../../models/Product";
import ProductDetailSkeleton from "./ProductDetailSkeleton";

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

type ProductDetailProps = {
  detailData: Product | undefined;
  loading: boolean;
};

type VariantSize = {
  id: number;
  size: string;
  quantity: number;
};

export default function ProductInfo({
  detailData,
  loading,
}: ProductDetailProps) {
  // states
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(-1);
  const [variantsSize, setVariantsSize] = useState<VariantSize[]>([]);

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

    console.log(">>> variation", variantsSize);
  }, [detailData]);



  // render
  return (
    <div>
      {loading && <ProductDetailSkeleton />}
      {!loading && detailData &&  (
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
              <span>Cyclone 2 - Blue/Aqua</span>
            </div>
          </div>

          <hr />
          {/* Product price */}
          <div className="detail-product-price">
            <span className="price-title">Giá:</span>
            <del className="product-price-compare">{formatPrice(detailData.price)}</del>
            <span className="product-price-main">{calculateDiscountedPrice(detailData.price, detailData.discount)}</span>
            <span className="price-precent">(-{detailData.discount}%)</span>
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
