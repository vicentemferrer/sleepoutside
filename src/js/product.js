import { setLocalStorage, getLocalStorage } from "./utils.mjs";

import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
    // setLocalStorage("so-cart", product);
    // Retrieve current cart items or initialize an empty array if none exist
    const cartItems = getLocalStorage("so-cart") || [];

    // Add the new item to the cart array
    cartItems.push(product);

    // Save the updated array back to localStorage
    setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
    const product = await dataSource.findProductById(e.target.dataset.id);
    addProductToCart(product);
}

// add listener to Add to Cart button
document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
