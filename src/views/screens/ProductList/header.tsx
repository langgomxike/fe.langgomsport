import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type HeaderProductListProps =  {
    productQuantity: number,
    categoryName: string,
    onFilterChange: (sort: string) => void
    setPageFirst: (page: number) => void
}

export default function HeaderProductList ({productQuantity, categoryName, onFilterChange, setPageFirst}:HeaderProductListProps ) {

    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [sort, setSort] = useState<string>(searchParams.get("sort") || "");

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const sortValue = event.target.value;
        setPageFirst(1);
        onFilterChange(sortValue);

        searchParams.set("sort", sortValue);
        navigate(`${location.pathname}?${searchParams.toString()}`);
    };

    useEffect(() => {
        // Cập nhật state khi URL thay đổi
        const currentSort = searchParams.get("sort");
        if (currentSort) {
            setSort(currentSort);
        }
    }, [location.search]);

    return (
        <div className="product-list-container-title">
            <div className="titleProducts">
                <h1>{categoryName}</h1>
                <span>({productQuantity} sản phẩm)</span>
            </div>
            <select
                className="form-select select-container"
                onChange={handleSortChange}
                defaultValue=""
                value={sort}
                aria-label="-- Sắp xếp theo --"
            >
                <option value="" disabled>-- Sắp xếp theo --</option>
                <option value="priceasc">Giá tăng dần</option>
                <option value="pricedesc">Giá giảm dần</option>
                <option value="discount">Mức giảm giá</option>
            </select>
        </div>
    )
}