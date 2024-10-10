import React, { useState, useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import "./PriceFilter.css";

function PriceSlider() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]); // Giá trị mặc định
  const [error, setError] = useState<string>(""); // Trạng thái lỗi
  const [isError, setIsError] = useState<boolean>(false); // Để kiểm soát khi nào tô đỏ

  // Hàm xử lý khi thay đổi giá trị của thanh trượt
  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      if (value[0] > value[1]) {
        setError("Min value cannot be greater than Max value");
        setIsError(true); // Kích hoạt trạng thái tô đỏ
      } else {
        setError("");
        setIsError(false); // Tắt trạng thái tô đỏ nếu không có lỗi
        setPriceRange(value);
      }
    }
  };

  // Hàm xử lý khi nhấn nút "Search"
  const handleSubmit = () => {
    if (priceRange[0] > priceRange[1]) {
      setError("Min value cannot be greater than Max value");
      setIsError(true);
    } else {
      alert(
        `Selected price range: ${priceRange[0].toLocaleString()}đ - ${priceRange[1].toLocaleString()}đ`
      );
    }
  };

  // Ẩn thông báo lỗi sau 2 giây nếu có lỗi
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
        setIsError(false);
      }, 2000); // Ẩn lỗi sau 2 giây

      return () => clearTimeout(timer); // Xóa bỏ timeout khi component unmount
    }
  }, [error]);

  return (
    <div className="price-filter">
      <h3>GIÁ</h3>
      <Range
        range
        min={0}
        max={2000000}
        step={1}
        value={priceRange}
        onChange={handleSliderChange}
        allowCross={false}
        style={{ marginBottom: "20px", width: "100%", height: "5px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>{priceRange[0].toLocaleString()}đ</span>
        <span>{priceRange[1].toLocaleString()}đ</span>
      </div>
      <div>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => {
            const newMin = Number(e.target.value);
            if (newMin > priceRange[1]) {
              setError("Min value cannot be greater than Max value");
              setIsError(true);
            } else {
              setError("");
              setIsError(false);
              setPriceRange([newMin, priceRange[1]]);
            }
          }}
          min="0"
          max={priceRange[1]}
          className={isError ? "error-input" : ""} // Áp dụng class để tô đỏ
        />
        <span> - </span>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => {
            const newMax = Number(e.target.value);
            if (priceRange[0] > newMax) {
              setError("Min value cannot be greater than Max value");
              setIsError(true);
            } else {
              setError("");
              setIsError(false);
              setPriceRange([priceRange[0], newMax]);
            }
          }}
          min={priceRange[0]}
          max="2000000"
          className={isError ? "error-input" : ""} // Áp dụng class để tô đỏ
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default PriceSlider;
