import { getLocalStorage, qs, checkVoidArr } from "./utils.mjs";

function setCounter() {
    const cartCounter = qs("#counter");

    const cartItems = getLocalStorage("so-cart") || [];

    if (!checkVoidArr(cartItems)) {
        cartCounter.classList.remove("hide");
        cartCounter.textContent = cartItems.length;
    } else {
        cartCounter.classList.add("hide");
    }
}

setCounter();

