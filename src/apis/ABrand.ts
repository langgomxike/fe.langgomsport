import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import Brand from "../models/Brand";
import Product from "../models/Product";

export default class ABrand {
  private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/brands";

  public static getAllBrands(
    onNext: (brands: Array<Brand>) => void,
    onLoading: (loading: boolean) => void
  ) {
    onLoading(true);
    axios
      .get(this.BASE_URL, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const brandsJson = response.data;
        const brands: Array<Brand> = [];
        brandsJson.map((item: any) => {
          const brand = item.brands as Brand;
          brands.push(brand);
        });
        onNext(brandsJson);
        onLoading(false);
      })
      .catch((err) => {
        SLog.log(LogType.Error, "getAllBrand", "Cannot get all Brands", err);
        // onNext([]);
        onLoading(false);
      });
  }

  // Lấy tất cả sản phẩm theo brandId
  public static getProductsByBrandId(
    brandId: number,
    onNext: (products: Product[]) => void,
    onLoading: (loading: boolean) => void
  ) {
    onLoading(true); // Bắt đầu trạng thái loading
    axios
      .get(`${this.BASE_URL}/products?brand=${brandId}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const products: Product[] = response.data;
        onNext(products); // Truyền dữ liệu sản phẩm vào callback onNext
        onLoading(false); // Kết thúc trạng thái loading
      })
      .catch((err) => {
        console.error("Error fetching products by brandId", err);
        onLoading(false); // Kết thúc trạng thái loading ngay cả khi có lỗi
      });
  }
}
