// import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
    let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
    if (!Array.isArray(cartItems)) {
        cartItems = [cartItems]; // Convert to an array if it's a single item object
    }
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
    let htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
}

function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;
    return newItem;
}

renderCartContents();
