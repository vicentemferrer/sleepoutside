import { setLocalStorage, loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";

setLocalStorage("so-cart", []);
loadHeaderFooter(setCounter);
