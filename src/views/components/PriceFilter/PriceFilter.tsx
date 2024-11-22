import React, { useState, useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import "./PriceFilter.css";
import { useLocation, useNavigate } from "react-router-dom";

interface PriceFilterProps {
  products: { price: number; discountedPrice?: number }[]; // Thêm thuộc tính discountedPrice
}

function PriceFilter({ products }: PriceFilterProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const priceParam = queryParams.get("price");

  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
  const [maxPrice, setMaxPrice] = useState<number>(2000000); // Giá trị maxPrice động
  const [error, setError] = useState<string>("");
  const [isMinError, setIsMinError] = useState<boolean>(false);
  const [isMaxError, setIsMaxError] = useState<boolean>(false);

  const STEP = 10000; // Bước điều chỉnh cho slider

  // Tính giá trị `maxPrice` từ sản phẩm và làm tròn
  useEffect(() => {
    if (products.length > 0) {
      // Lấy giá đã giảm nếu có, nếu không thì lấy giá gốc
      const prices = products.map(
        (product) => product.discountedPrice || product.price
      );

      // Tìm giá trị lớn nhất trong danh sách sản phẩm
      const max = Math.max(...prices);

      // Hàm tự động làm tròn giá trị
      const roundToNearest = (value: number) => {
        const power = Math.floor(Math.log10(value)); // Tính số lượng chữ số của giá trị
        const factor = Math.pow(10, power); // Tính bội số của 10 gần nhất (10, 100, 1000...)
        return Math.ceil(value / factor) * factor; // Làm tròn lên bội số gần nhất
      };

      // Làm tròn giá trị maxPrice tự động
      const roundedMax = roundToNearest(max);

      setMaxPrice(roundedMax);
      setPriceRange((prevRange) => [prevRange[0], roundedMax]);
    }
  }, [products]);

  // Cập nhật giá trị từ query param (nếu có)
  useEffect(() => {
    if (priceParam) {
      const [min, max] = priceParam.split("-").map(Number);
      setPriceRange([min, max]);
    }
  }, [priceParam]);

  // Hàm kiểm tra hợp lệ của min và max
  const validateRange = (min: number, max: number) => {
    if (min > max) {
      setError("Giá min phải nhỏ hơn giá max!");
      setIsMinError(true);
      setIsMaxError(true);
      return false;
    }
    setError("");
    setIsMinError(false);
    setIsMaxError(false);
    return true;
  };

  // Xử lý khi nhấn nút "Tìm kiếm"
  const handleSubmit = () => {
    if (validateRange(priceRange[0], priceRange[1])) {
      const searchParams = new URLSearchParams(location.search);
      const priceParam = `${priceRange[0]}-${priceRange[1]}`;
      searchParams.set("price", priceParam);
      navigate(`/products?${searchParams.toString()}`);
    }
  };

  // Xử lý thay đổi giá trị slider
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value);
      validateRange(value[0], value[1]);
    }
  };

  // Xử lý thay đổi giá trị ô input Min
  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, ""); // Loại bỏ số 0 đầu
    const newMin = Number(value);
    setPriceRange([newMin, priceRange[1]]);
    validateRange(newMin, priceRange[1]);
  };

  // Xử lý thay đổi giá trị ô input Max
  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, ""); // Loại bỏ số 0 đầu
    const newMax = Number(value);
    setPriceRange([priceRange[0], newMax]);
    validateRange(priceRange[0], newMax);
  };

  return (
    <div className="price-filter">
      <h3>GIÁ</h3>
      <Range
        range
        min={0}
        max={maxPrice} // Giá trị max động, làm tròn tối thiểu 1 triệu
        step={STEP}
        value={priceRange}
        onChange={handleSliderChange}
        allowCross={false}
        style={{ marginBottom: "20px", width: "100%", height: "5px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{priceRange[0].toLocaleString()}đ</span>
        <span>{priceRange[1].toLocaleString()}đ</span>
      </div>
      <div className="inputRangeContainer">
        <input
          type="number"
          value={priceRange[0]}
          onChange={handleMinInputChange}
          min="0"
          max={priceRange[1]}
          step={STEP}
          className={isMinError ? "error-input" : ""}
        />
        <input
          type="number"
          value={priceRange[1]}
          onChange={handleMaxInputChange}
          min={priceRange[0]}
          max={maxPrice}
          step={STEP}
          className={isMaxError ? "error-input" : ""}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Tìm kiếm</button>
    </div>
  );
}

export default PriceFilter;
