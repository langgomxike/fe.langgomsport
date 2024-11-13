import axios from "axios";
import Order from "../models/Order";
import CartCookie from "../models/CartCookies";
import Variant from "../models/Variant";

export default class ACart {
    private static BASE_API_URL = process.env.REACT_APP_API_BASE_URL + "/carts";

    // Gọi API tạo Order nếu chưa có
    public static storeOrder(onNext: (order: Order) => void) {
        axios.post(`${this.BASE_API_URL}/create-cart`)
        .then((response) => {            
            onNext(response.data)
        })
        .catch((err) => {
            console.error("storeOrder",err);
        });
    }

    public static addToCart(
        orderId: string,
        variantId: number,
        quantity: number,
        onNext: (order: Order) => void,
        onLoading: (loading: boolean) => void
    ) {
        axios.post(`${this.BASE_API_URL}`)
        .then((response) => {
            
        })
        .catch((err) => {
            console.log("addToCart", err);
            
        })
    }

    public static getCartByVariantIds(
        cart: CartCookie[], 
        onNext: (cartVariants: Variant[]) => void,
        onLoading: (loading: boolean) => void
    ){

        onLoading(true);
        
        // Chuyển mảng `variantIds` thành chuỗi các ID, ngăn cách bằng dấu phẩy
        const variantIdsString = cart.map((variant) => variant.variantId).join(",");
        
        axios.get(`${this.BASE_API_URL}/variants?ids=${variantIdsString}`, {
            headers: { "Content-Type": "application/json" }
        })
       .then((response) => {
            onLoading(false);
            // console.log("getCartByVariantIds url: ",response.data);
            const cartVariants = response.data;
            onNext(cartVariants);
            
       })
       .catch((err) => {
            console.log("getCartByVariantIds", err);
            
        })
    }
}