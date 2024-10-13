import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import Brand from "../models/Brand";

export default class ABrand {
  private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/brands";

  public static getAllBrands(
      onNext: (brands: Array<Brand>) => void,
      onLoading: (loading: boolean) => void
  ) {
    onLoading(true)
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
        onLoading(false)
        
      })
      .catch((err) => {
        SLog.log(LogType.Error, "getAllBrand", "Cannot get all Brands", err);
        // onNext([]);
        onLoading(false)
      });
  }
}
