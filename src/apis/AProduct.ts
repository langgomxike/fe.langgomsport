import axios from "axios";
import SLog, { LogType } from "../services/SLog";

export default class AProduct {

    private static BASE_URL = process.env.REACT_APP_API_BASE_URL + "/products"

    public static getAllProducts(onNext: (products: Array<unknown>) => void) {
        axios.get<unknown>(this.BASE_URL, {
            headers: { "Content-Type": "application/json" }
        }).then(products => {
            onNext(products.data as unknown[]);
        }).catch(err => {
            SLog.log(LogType.Error, "getAllProducts", "Cannot get all products", err)
            onNext([]);
        });
    }
}