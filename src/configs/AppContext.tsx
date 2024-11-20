import LanguageContext from "./LanguageConfig";
import {ChildProps} from "@uiw/react-md-editor/lib/components/Toolbar/Child";
import {useCallback, useEffect, useState} from "react";
import vn from "../data/vn.json";
import {CartItem} from "../views/components/ProductDetail/ProductDetail";
import CartContext from "./CartConfig";
import {it} from "node:test";
import Cookies from "js-cookie";
import ConfigValue from "./ConfigValue";

const expires = ConfigValue.CART_COOKIE_EXPRIRATION_LIMIT
const CART_KEY_NAME = "cart";

export default function AppContext({children}: ChildProps) {
  //states
  // @ts-ignore
  const [language, setLanguage] = useState<typeof vn>(vn);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  //handlers
  const addToCart = useCallback((item: CartItem) => {
    let oldQuantity = 0;
    const remainingItems = [];

    cartItems.forEach(itemInCart => {
      if (itemInCart.variantId === item.variantId) {
        oldQuantity += itemInCart.quantity;
      } else {
        remainingItems.push(itemInCart);
      }
    });

    item.quantity += oldQuantity;
    remainingItems.push(item);

    setCartItems(remainingItems);
    saveCart(remainingItems);
  }, [cartItems]);

  const removeFromCart = useCallback((variantIds: number[]) => {
    const remainItems = cartItems.filter(item => !variantIds.includes(item.variantId));
    setCartItems(remainItems);
    saveCart(remainItems);
  }, [cartItems]);

  //effects
  useEffect(() => {
    const existingCartItems: CartItem[] = JSON.parse(Cookies.get(CART_KEY_NAME) ?? "[]");

    if (existingCartItems) {
      setCartItems(existingCartItems);
    }
  }, []);

  const saveCart = useCallback((cartItems: CartItem[]) => {
    Cookies.set(CART_KEY_NAME, JSON.stringify(cartItems), { expires: expires });
    console.log("set cart successfully");
  }, []);

  return (
    <LanguageContext.Provider value={{language: language, changeLanguage: setLanguage}}>
      <CartContext.Provider value={{
        items: cartItems,
        addToCart: addToCart,
        removeFromCart: removeFromCart,
        updateQuantity: updateQuantity
      }}>
        {children}
      </CartContext.Provider>
    </LanguageContext.Provider>
  )
}