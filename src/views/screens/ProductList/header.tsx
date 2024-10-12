import React from "react";

type HeaderProductListProps =  {
    productQuantity: number,
    categoryName: string,
    onFilterChange: (sort: boolean) => void
}

export default function HeaderProductList ({productQuantity, categoryName, onFilterChange}:HeaderProductListProps ) {

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === "asc_price") {
            onFilterChange(true); // Sắp xếp tăng dần
        } else if (value === "desc_price") {
            onFilterChange(false); // Sắp xếp giảm dần
        }
    };

    return (
        <div className="product-list-container-title">
            <div className="titleProducts">
                <h1>{categoryName}</h1>
                <span>({productQuantity} sản phẩm)</span>
            </div>
            <select className="form-select select-container" onChange={handleSortChange}  aria-label="-- Sắp xếp theo --">
                <option selected>-- Sắp xếp theo --</option>
                <option value="asc_price">Giá tăng dần</option>
                <option value="desc_price">Giá giảm dần</option>
                {/*<option value="desc_price">Giảm giá</option>*/}
            </select>
        </div>
    )
}