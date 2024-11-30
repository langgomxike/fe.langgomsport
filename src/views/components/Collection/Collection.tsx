import React from "react";
import "./Collection.css";
import ProductItem from "../Product/ProductItem";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// Định nghĩa props cho Collection component
interface CollectionProps {
  collections: Array<any>; // Dữ liệu các collection
}

export default function Collection({ collections }: CollectionProps) {
  return (
    <div className="collection">
      {collections.map((collection: any) => (
        <div className="collection-item" key={collection.id}>
          <h2 className="collection-title">{collection.name}</h2>
          <div className="collection-content">
            {/* Hình ảnh đại diện collection */}
            <div className="collection-image">
              <img
                src={`${BASE_URL}/${collection.image}`}
                alt={collection.name}
                className="collection-image"
              />
            </div>

            {/* Danh sách sản phẩm */}
            <div className="products-grid">
              {collection.products.slice(0, 6).map((product: any) => (
                <ProductItem key={product.id} data={product} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
