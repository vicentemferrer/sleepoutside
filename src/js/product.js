// import { setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
    // setLocalStorage("so-cart", product);
    // Retrieve current cart items or initialize an empty array if none exist
    let cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];

    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
        cartItems = [cartItems]; // Wrap the single item in an array if it is not already one
    }

    // Add the new item to the cart array
    cartItems.push(product);

    // Save the updated array back to localStorage
    localStorage.setItem("so-cart", JSON.stringify(cartItems));
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
