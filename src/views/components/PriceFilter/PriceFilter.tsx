import React, { useState, useEffect } from "react";
import Range from "rc-slider";
import "rc-slider/assets/index.css";
import "./PriceFilter.css";

type PriceFilterProps = {
    onFilterChange: (minValue: number, maxValue:number) => void
}

function PriceFilter({onFilterChange}:PriceFilterProps) {
    const [priceRange, setPriceRange] = useState<number[]>([0, 2000000]);
    // biến để lưu thông báo lỗi
    const [error, setError] = useState<string>("");
    // biến để tô đỏ chữ
    const [isError, setIsError] = useState<boolean>(false);

    // Hàm xử lý khi thay đổi giá trị của thanh trượt
    const handleSliderChange = (value: number | number[]) => {
        if (Array.isArray(value)) {
            if (value[0] > value[1]) {
                setError("Nhập số quá quy định cho phép !!!");
                setIsError(true);
            } else {
                setError("");
                setIsError(false);
                setPriceRange(value);
            }
        }
    };

    // Hàm xử lý khi nhấn nút "Search"
    const handleSubmit = () => {
        if (priceRange[0] > priceRange[1]) {
            setError("Nhập số quá quy định cho phép !!!");
            setIsError(true);
        } else {
            onFilterChange(priceRange[0], priceRange[1]);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
                setIsError(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/^0+/, "");
        const newMin = Number(value);
        if (newMin > priceRange[1]) {
            setError("Nhập số quá quy định cho phép !!!");
            setIsError(true);
        } else {
            setError("");
            setIsError(false);
            setPriceRange([newMin, priceRange[1]]);
        }
    };

    const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/^0+/, "");
        const newMax = Number(value);
        if (priceRange[0] > newMax) {
            setError("Nhập số quá quy định cho phép !!!");
            setIsError(true);
        } else {
            setError("");
            setIsError(false);
            setPriceRange([priceRange[0], newMax]);
        }
    };

    return (
        <div className="price-filter">
            <h3>GIÁ</h3>
            <Range
                range
                min={0}
                // Giá trị tối đa của thanh trượt
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
                    value={priceRange[0] === 0 ? "" : priceRange[0]} // Nếu giá trị là 0 thì hiển thị rỗng
                    onInput={handleMinInputChange}
                    min="0"
                    max={priceRange[1]}
                    className={isError ? "error-input" : ""}
                />
                <input
                    type="number"
                    value={priceRange[1] === 0 ? "" : priceRange[1]}
                    onInput={handleMaxInputChange}
                    min={priceRange[0]}
                    max="20000000"
                    className={isError ? "error-input" : ""}
                />
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button onClick={handleSubmit}>Tìm kiếm</button>
        </div>
    );
}

export default PriceFilter;