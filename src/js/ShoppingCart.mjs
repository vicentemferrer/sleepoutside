import {
    getLocalStorage,
    setLocalStorage,
    qs,
    qsAll,
    checkVoidArr
} from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";

function setupQuantity(element) {
  const dec = qs(".dec", element.parentElement);
  const inc = qs(".inc", element.parentElement);

  const id = parseInt(element.dataset.id);

  const setQuantity = (quantity) => {
    if (quantity > 0) {
      const updatedItems = this.cartItems.map((item, i) => {
        if (i === id) {
          item["qty"] = quantity;
        }
        return item;
      });
      setLocalStorage(this.key, updatedItems);
      this.init(setCounter);
    }
  };

  dec.addEventListener("click", () => {
    const currentQty = this.cartItems[id].qty;
    setQuantity(currentQty - 1);
  });

  inc.addEventListener("click", () => {
    const currentQty = this.cartItems[id].qty;
    setQuantity(currentQty + 1);
  });
}

function cartItemTemplate(item, i) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <picture>
        <source media="(min-width: 768px)" srcset="${item.Images.PrimaryMedium}" />
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}" />
    </picture>
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">
    <button class='dec'>-</button>
    <span class="qty" data-id="${i}">qty: <span>${item.qty}</span></span>
    <button class='inc'>+</button>
  </p>
  <p class="cart-card__price">$${(item.FinalPrice * item.qty).toFixed(2)}</p>
  <div class="cart-card__remove">
    <button class="removeFromCart" data-id="${i}">Remove From Cart</button>
  </div>
</li>`;

  return newItem;
}

function removeListener(e) {
  const filteredItems = this.cartItems.filter(
    (_, i) => i !== parseInt(e.currentTarget.dataset.id),
  );
  setLocalStorage(this.key, filteredItems);
  this.init();
  setCounter();
}

export default class ShoppingCart {
  constructor(key, parentSelector, cartTotal) {
    this.key = key;
    this.parentSelector = parentSelector;
    this.cartTotal = cartTotal;
  }

  init(callback = () => {}) {
    this.cartItems =
      getLocalStorage(this.key).map((obj) => {
        if (!("qty" in obj)) {
          obj["qty"] = 1;
        }
        return obj;
      }) || [];

    this.renderCartContents();

    Array.from(qsAll(".qty")).forEach(setupQuantity.bind(this));

    Array.from(qsAll(".removeFromCart")).forEach((button) => {
      button.addEventListener("click", removeListener.bind(this));
    });

    callback();
  }

  renderCartContents() {
    const htmlItems = this.cartItems.map(cartItemTemplate);
    qs(this.parentSelector).innerHTML = htmlItems.join("");

    this.renderTotal();
  }

  renderTotal() {
    const cartFooter = qs(this.cartTotal);
    if (!checkVoidArr(this.cartItems)) {
      const total = this.cartItems.reduce(
        (acc, item) => acc + item.FinalPrice * item.qty,
        0,
      );
      cartFooter.classList.remove("hide");
      qs("span", cartFooter).textContent = `$${total.toFixed(2)}`;
    } else {
      cartFooter.classList.add("hide");
    }
  }
}

// export default class subtotalSummary {
//     constructor(parentSelector, subtotal, tax, shipping, orderTotal) {
//         this.parentSelector = parentSelector;
//         this.subtotal = subtotal;
//         this.tax = tax;
//         this.shipping = shipping;
//         this.orderTotal = orderTotal;
//     }
//     const SubtotalElement = qs(this.subtotal);
//     const taxElement = qs(this.tax);
//     const shippingElement = qs(this.shipping);
//     const orderTotalElement = qs(this.orderTotal);

//     if(!checkVoidArr(this.cartItems)) {
//     const Subtotal = this.cartItems.reduce(
//         (acc, item) => acc + item.FinalPrice * item.qty,
//         0,
//     );
//     // Calculate tax (6% of subtotal)
//     const tax = Subtotal * 0.06;

//     // Calculate shipping ($10 for the first item, $2 for each additional item)
//     const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
//     const shipping = totalItems > 0 ? 10 + (totalItems - 1) * 2 : 0;

//     // Calculate order total
//     const orderTotal = Subtotal + tax + shipping;
//     qs("span", cartFooter).textContent = `$${total.toFixed(2)}`;
// } else {
//     cartFooter.classList.add("hide");
// }
// }