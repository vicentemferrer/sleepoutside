import { loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter(setCounter);

const cart = new ShoppingCart("so-cart", ".product-list", ".cart-footer");
cart.init();
