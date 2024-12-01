import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import Brand from "../models/Brand";

export default class ABrand {
  private static BASE_URL = process.env.REACT_APP_API_BASE_URL;

  public static getAllBrands(
      onNext: (brands: Array<Brand>) => void,
      onLoading: (loading: boolean) => void
  ) {
    onLoading(true)
    axios
      .get(`${this.BASE_URL}/brands`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        const brandsJson = response.data;
        onNext(brandsJson);
        onLoading(false)
        
      })
      .catch((err) => {
        SLog.log(LogType.Error, "getAllBrand", "Cannot get all Brands", err);
        // onNext([]);
        onLoading(false)
      });
  }

  public static getHomeBrands(
    onNext: (brands: Array<Brand>) => void,
    onLoading: (loading: boolean) => void
) {
  onLoading(true)
  axios
  .get(`${this.BASE_URL}/home-brands`, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => {
      onLoading(false);
      const brandsJson = response.data;
      const brands: Array<Brand> = [];

      brandsJson.map((item: any) => {
        const brand = item.brand as Brand;
        brands.push(brand);
      });

      onNext(brands);
      onLoading(false)
      
    })
    .catch((err) => {
      SLog.log(LogType.Error, "getAllBrand", "Cannot get all Brands", err);
      // onNext([]);
      onLoading(false)
    });
}
}
