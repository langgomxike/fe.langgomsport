import React from "react";
import "./productItem.css"

type ProductIem = {

}

export default function () {
    return (
        <div className="product-item">
            <div className="product-image">
                <img className="img-fluid img-main"
                     src={"https://pos.nvncdn.com/be3294-43017/ps/20240817_eiNcbYvsLM.png"} alt=""/>
                <img className="img-fluid img-sub"
                     src={"https://pos.nvncdn.com/be3294-43017/ps/20240713_MbWL5neln8.jpeg"} alt=""/>
                <div className="product-sale">
                    <span>50%</span>
                </div>
            </div>
            <h3 className="product-title">
                <a href={"#"} title="Giày chạy bộ Fly Fish Pro 361º Nam W572322221-1">Giày chạy bộ Fly
                    Fish Pro 361º Nam W572322221-1</a>
            </h3>
            <div className="product-price">
                <span>976,909₫ </span>
                <del>1,953,818₫</del>
            </div>
            <div className="product-bottom">
            </div>
        </div>
    )
}