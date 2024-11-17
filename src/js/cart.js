import { getLocalStorage, qs, checkVoidArr } from "./utils.mjs";

function renderCartContents() {
    const cartItems = getLocalStorage("so-cart") || [];
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    totalCartManage(cartItems);
}

function totalCartManage(arr) {
    const cartFooter = qs(".cart-footer");
    if (!checkVoidArr(arr)) {
        const total = arr.reduce((acc, item) => {
            acc += item.FinalPrice;
            return acc;
        }, 0);
        cartFooter.classList.remove("hide");
        qs("span", cartFooter).textContent = `$${total}`;
    } else {
        cartFooter.classList.add("hide");
    }
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
