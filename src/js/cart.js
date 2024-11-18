import { getLocalStorage, setLocalStorage, qs, checkVoidArr } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart") || [];
function renderCartContents(cartItems) {
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));// Convert each cart item into HTML
  qs(".product-list").innerHTML = htmlItems.join("");// Populate the `.product-list` container with HTML
  totalCartManage(cartItems);// Update total cost or other cart management logic
}

function renderCart() {
  const cartContainer = qs('.cart');// Select the cart container element
  if (!cartItems || checkVoidArr(cartItems)) {    // If the cart is empty
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cartContainer.innerHTML = '';// Clear the container to prevent duplicate rendering
    // Example: Append item details to the container
    renderCartContents(cartItems); // Render the contents of the cart
  };
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

// renderCartContents();
renderCart();