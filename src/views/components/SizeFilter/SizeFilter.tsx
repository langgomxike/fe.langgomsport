import React, {useState} from "react";
import './sizeFilter.css'

// const sizes = [
//     "37 1/3", "38", "38 2/3", "7", "40", "8", "41", "41 1/3", "41.5", "42", "42 2/3", "42.5", "43", "43.5", "43 1/3"
// , "44", "44 2/3", "44.5", "45", "45 1/3", "46", "46.5" , "46 2/3", "47"]

const sizes = [
    "S", "M", "L", "XL", "XXL", "30", "31", "32", "33", "34"
];

export default function () {
    // state
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    // Hàm xử lý khi chọn nhiều size
    const toggleSize = (size: string) => {
        if (selectedSizes.includes(size)) {
            setSelectedSizes(selectedSizes.filter(s => s !== size))
        } else {
            setSelectedSizes([...selectedSizes, size])
        }
    }

    // render
    return (
        <div className="size-filter-container">
            <h3 className="size-filter-title">
                Kích cỡ
            </h3>
            <div className="size-block">
                {
                    sizes.map((size) => (
                        <div
                            key={size}
                            className={`size-item ${selectedSizes.includes(size) ? 'active' : ''}`}
                            onClick={() => toggleSize(size)}
                        >
                            <span>{size}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}