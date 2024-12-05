import { loadHeaderFooter, animateCartIcon } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter(setCounter);
animateCartIcon();

const cart = new ShoppingCart("so-cart", ".product-list", ".cart-footer");
cart.init();


