import axios from "axios";
import Order from "../models/Order";
import CartCookie from "../models/CartCookies";
import Variant from "../models/Variant";
import {CartItem} from "../views/components/ProductDetail/ProductDetail";

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
        cart: CartItem[],
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

            const cartVariants = response.data;
            onNext(cartVariants);
       })
       .catch((err) => {
            console.log("getCartByVariantIds", err);
            
        })
    }

    // ĐẶT HÀNG
    public static placeOrder(
        fullName: string,
        phoneNumber: string,
        orderVariants: CartCookie[],
        onSuccess: (message: string) => void,
        onError: (error: string) => void
    ) {
        const payload = {
            fullName,
            phoneNumber,
            orderVariants: orderVariants.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity
            }))
        };
        console.log("payload: " + JSON.stringify(payload));
        
    
        axios.post(`${this.BASE_API_URL}/multi-order`, payload)
        .then((response) => {
            onSuccess(response.data.message || "Đặt hàng thành công!");
        })
        .catch((err) => {
            console.error("placeOrder", err);
            onError("Đã xảy ra lỗi khi đặt hàng. Vui lòng thử lại!");
        });
    }
    
}