import {
    getLocalStorage,
    setLocalStorage,
    qs,
    qsAll,
    checkVoidArr,
} from "./utils.mjs";

const cartItems = getLocalStorage("so-cart") || [];

function addListener(button) {
    button.addEventListener("click", function () {
        for (let i = 0; i < cartItems.length; i++) {
            if (cartItems[i].Id === button.id) {
                cartItems.splice(i, 1);
                setLocalStorage("so-cart", cartItems);
                renderCart();
                break;
            }
        }
    });
}

function renderCartContents() {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item)); // Convert each cart item into HTML
    qs(".product-list").innerHTML = htmlItems.join(""); // Populate the `.product-list` container with HTML
    const buttonList = qsAll(".removeFromCart");
    for (let i = 0; i < buttonList.length; i++) {
        addListener(buttonList[i]);
    }
    totalCartManage(); // Update total cost or other cart management logic
}

function renderCart() {
    const cartContainer = qs(".cart"); // Select the cart container element
    if (!cartItems || checkVoidArr(cartItems)) {
        // If the cart is empty
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        qs(".product-list").innerHTML = "";
        qs("#total").innerHTML = "$0.00";
    } else {
        cartContainer.innerHTML = ""; // Clear the container to prevent duplicate rendering
        // Example: Append item details to the container
        renderCartContents(); // Render the contents of the cart
    }
}

function totalCartManage() {
    const cartFooter = qs(".cart-footer");
    if (!checkVoidArr(cartItems)) {
        const total = cartItems.reduce((acc, item) => {
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
  <div class="cart-card__remove">
    <button class="removeFromCart" id="${item.Id}">Remove From Cart</button>
  </div>
</li>`;

    return newItem;
}

// renderCartContents();
renderCart();
