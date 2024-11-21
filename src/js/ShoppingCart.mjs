import {
    getLocalStorage,
    setLocalStorage,
    qs,
    qsAll,
    checkVoidArr,
} from "./utils.mjs";

function cartItemTemplate(item, i) {
    const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
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
}

export default class ShoppingCart {
    constructor(key, parentSelector, cartTotal) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.cartTotal = cartTotal;
    }

    init() {
        this.cartItems = getLocalStorage(this.key) || [];
        this.renderCartContents();

        Array.from(qsAll(".removeFromCart")).forEach((button) => {
            button.addEventListener("click", removeListener.bind(this));
        });
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
                (acc, item) => acc + item.FinalPrice,
                0,
            );
            cartFooter.classList.remove("hide");
            qs("span", cartFooter).textContent = `$${total}`;
        } else {
            cartFooter.classList.add("hide");
        }
    }
}
