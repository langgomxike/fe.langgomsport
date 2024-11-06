import React, { useState, useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import "./PriceFilter.css";
import { useLocation, useNavigate } from "react-router-dom";

type PriceFilterProps = {
  onFilterChange: (minValue: number, maxValue: number) => void;
};

function PriceFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const priceParam = queryParams.get("price");

  const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
  const [error, setError] = useState<string>("");
  const [isMinError, setIsMinError] = useState<boolean>(false);
  const [isMaxError, setIsMaxError] = useState<boolean>(false);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      if (value[0] > value[1]) {
        setError("Giá min phải nhỏ hơn giá max!");
        setIsMinError(true);
        setIsMaxError(true);
      } else {
        setError("");
        setIsMinError(false);
        setIsMaxError(false);
        setPriceRange(value);
      }
    }
  };

  const handleSubmit = () => {
    if (priceRange[0] > priceRange[1]) {
      setError("Giá min phải nhỏ hơn giá max!");
      setIsMinError(true);
      setIsMaxError(true);
    } else {
      const searchParams = new URLSearchParams(location.search);
      const priceParam = `${priceRange[0]}-${priceRange[1]}`;
      searchParams.set("price", priceParam);
      navigate(`/products?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    if (priceParam) {
      setPriceRange(priceParam.split("-").map(Number));
    }
  }, [priceParam]);

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "");
    const newMin = Number(value);
    setPriceRange([newMin, priceRange[1]]);

    if (newMin > priceRange[1]) {
      setError("Giá min phải nhỏ hơn giá max!");
      setIsMinError(true);
    } else {
      setError("");
      setIsMinError(false);
    }
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/^0+/, "");
    const newMax = Number(value);
    setPriceRange([priceRange[0], newMax]);

    if (priceRange[0] > newMax) {
      setError("Giá max phải lớn hơn giá min!");
      setIsMaxError(true);
    } else {
      setError("");
      setIsMaxError(false);
    }
  };

  return (
    <div className="price-filter">
      <h3>GIÁ</h3>
      <Range
        range
        min={0}
        max={20000000}
        step={1000}
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
          value={priceRange[0] === 0 ? "0" : priceRange[0]}
          onInput={handleMinInputChange}
          min="0"
          max={priceRange[1]}
          className={isMinError ? "error-input" : ""}
        />
        <input
          type="number"
          value={priceRange[1] === 0 ? "" : priceRange[1]}
          onInput={handleMaxInputChange}
          min={priceRange[0]}
          max="20000000"
          className={isMaxError ? "error-input" : ""}
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit}>Tìm kiếm</button>
    </div>
  );
}

export default PriceFilter;
