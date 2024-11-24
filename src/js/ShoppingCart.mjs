import {
    getLocalStorage,
    setLocalStorage,
    qs,
    qsAll,
    checkVoidArr,
} from "./utils.mjs";

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
            this.init();
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
}

export default class ShoppingCart {
    constructor(key, parentSelector, cartTotal) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.cartTotal = cartTotal;
    }

    init() {
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
