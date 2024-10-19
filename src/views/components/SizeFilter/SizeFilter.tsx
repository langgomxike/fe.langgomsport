import React, {useEffect, useState} from "react";
import './sizeFilter.css'
import ASize from "../../../apis/ASize";
import Size from "../../../models/Size";
import SizeSkeleton from "./SizeSkeleton";

type SizeFilterProps = {
    categoryId: number | undefined; // Nhận categoryId từ props
    onFilterChange: (sizeIds: number[]) => void;
};

export default function ({categoryId, onFilterChange}: SizeFilterProps) {
    // state
    const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
    const [sizes, setSizes] = useState<Size[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    // Hàm xử lý khi chọn nhiều size
    const toggleSize = (size: number) => {
        if (selectedSizes.includes(size)) {
            const newSelectedSizes = selectedSizes.filter(s => s !== size);
            setSelectedSizes(newSelectedSizes);
            onFilterChange(newSelectedSizes); // Cập nhật filter
        } else {
            const newSelectedSizes = [...selectedSizes, size];
            setSelectedSizes(newSelectedSizes);
            onFilterChange(newSelectedSizes); // Cập nhật filter
        }
    }

    // effect
    useEffect(() => {
        const fetchSizes = () => {
            // Gọi phương thức getSizesByCategory với categoryId
            ASize.getSizesByCategory(
                categoryId ?? 1,
                (data: Size[]) => {
                    setSizes(data);
                },
                setLoading
            );
        };

        // Chỉ gọi fetchSizes nếu categoryId có giá trị hợp lệ
        if (categoryId) {
            fetchSizes();
        }
    }, [categoryId]); // Chạy lại khi categoryId thay đổi

    //render

    return (
        <div className="size-filter-container">
            <h3 className="size-filter-title">
                Kích cỡ
            </h3>
            {loading && <SizeSkeleton/>}
            {
                !loading &&
                <div className="size-block">
                    {
                        sizes.map((item) => (
                            <div
                                key={item.id}
                                className={`size-item ${selectedSizes.includes(item.id) ? 'active' : ''}`}
                                onClick={() => toggleSize(item.id)}
                            >
                                <span>{item.size}</span>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    );
}