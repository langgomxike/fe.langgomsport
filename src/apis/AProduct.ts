import axios from "axios";
import SLog, { LogType } from "../services/SLog";
import ProductDTO from "../dtos/ProductDTO";

export default class AProduct {

    private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/products"

    public static getAllProducts(
        onNext: (products: Array<ProductDTO>) => void,
        onLoading: (loading:boolean) => void
    ) {
        onLoading(true)
        axios.get(this.BASE_URL, {
            headers: { "Content-Type": "application/json" }
        }).then(products => {
            onLoading(false)
            onNext(products.data);
        }).catch(err => {
            SLog.log(LogType.Error, "getAllProducts", "Cannot get all products", err);
            onLoading(false)
            onNext([]);
        });
    }
}