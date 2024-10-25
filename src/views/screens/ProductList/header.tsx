import React from "react";

type HeaderProductListProps =  {
    productQuantity: number,
    categoryName: string,
    onFilterChange: (sort: string) => void
    setPageFirst: (page: number) => void
}

export default function HeaderProductList ({productQuantity, categoryName, onFilterChange, setPageFirst}:HeaderProductListProps ) {

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setPageFirst(1);
        onFilterChange(value);
    };

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
                aria-label="-- Sắp xếp theo --"
            >
                <option value="" disabled>-- Sắp xếp theo --</option>
                <option value="PRICEASC">Giá tăng dần</option>
                <option value="PRICEDESC">Giá giảm dần</option>
                <option value="DISCOUNTASC">Giảm giá tăng dần</option>
                <option value="DISCOUNTDESC">Giảm giá giảm dần</option>
            </select>
        </div>
    )
}