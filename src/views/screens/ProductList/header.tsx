import React from "react";


export default  function () {
    return (
        <div className="product-list-container-title">
            <div className="titleProducts">
                <h1>Giày chạy bộ</h1>
                <span>(100 sản phẩm)</span>
            </div>
            <select className="form-select select-container" aria-label="-- Sắp xếp theo --">
                <option selected>-- Sắp xếp theo --</option>
                <option value="asc_price">Giá tăng dần</option>
                <option value="desc_price">Giá giảm dần</option>
                <option value="desc_price">Giảm giá</option>
            </select>
        </div>
    )
}