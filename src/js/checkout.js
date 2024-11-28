import { loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import CheckoutProcess from "./CheckoutProcess.mjs";

loadHeaderFooter(setCounter);

const process = new CheckoutProcess("so-cart", ".summary");

process.init();
