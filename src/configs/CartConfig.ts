import {createContext} from "react";
import {CartItem} from "../views/components/ProductDetail/ProductDetail";

export type CartConfigType = {
  items: CartItem[];
  addToCart: (items: CartItem) => void;
  removeFromCart: (variantIds: number[]) => void;
  updateQuantity: (variantId: number, quantity: number) => void;
}

const CartContext = createContext<CartConfigType>({
  items: [],
  addToCart: () => {},
  removeFromCart: ([]) => {},
  updateQuantity: () => {},
});

export default CartContext;