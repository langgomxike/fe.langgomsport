import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import Product from "../models/Product";

export type ProductParams = {
  category?: string;
  size?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page: number;
  limit: number;
};

export default class AProduct {
  private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/products";

  public static getAllProducts(
    onNext: (products: Array<Product>) => void,
    category?: string,
    size?: string,
    brand?: string,
    minPrice?: number,
    maxPrice?: number,
    sortBy?: string,
    page: number = 1,
    limit: number = 10
  ) {
    const queryParams: ProductParams = {
      category,
      size,
      brand,
      minPrice,
      maxPrice,
      sortBy,
      page,
      limit,
    };

    // Lọc bỏ những query không có giá trị
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams).filter(
        ([_, v]) => v !== undefined && v !== null
      )
    );

    axios
      .get(this.BASE_URL, {
        headers: { "Content-Type": "application/json" },
        params: filteredParams,
      })
      .then((response) => {
        // Sửa thành kiểm tra `response.data`
        if (Array.isArray(response.data)) {
          const products: Array<Product> = response.data as Array<Product>; // Ép kiểu dữ liệu trả về
          onNext(products);
        } else {
          // Nếu không phải mảng, log lỗi và trả về mảng trống
          SLog.log(
            LogType.Error,
            "getAllProducts",
            "API response is not an array",
            response.data
          );
          onNext([]);
        }
      })
      .catch((err) => {
        SLog.log(LogType.Error, "getAllProducts", "Cannot get products", err);
        onNext([]);
      });
  }
}
