import { getLocalStorage, qs, checkVoidArr } from "./utils.mjs";

export function setCounter() {
  const cartCounter = qs("#counter");

  const cartItems = getLocalStorage("so-cart") || [];

  if (!checkVoidArr(cartItems)) {
    cartCounter.classList.remove("hide");
    cartCounter.textContent = cartItems.reduce(
      (acc, item) => acc + item.qty,
      0,
    );
  } else {
    cartCounter.classList.add("hide");
  }
}

