import {createContext} from "react";
import {CartItem} from "../views/components/ProductDetail/ProductDetail";

export type CartConfigType = {
  items: CartItem[];
  addToCart: (items: CartItem) => void;
  removeFromCart: (variantIds: number[]) => void;
}

const CartContext = createContext<CartConfigType>({
  items: [],
  addToCart: () => {},
  removeFromCart: ([]) => {}
});

export default CartContext;