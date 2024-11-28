import { loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import { setLocalStorage } from "./utils.mjs";
setLocalStorage("so-cart", []);
loadHeaderFooter(setCounter);
