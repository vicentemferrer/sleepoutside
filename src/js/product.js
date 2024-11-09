import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

function addProductToCart(product) {
    // Retrieve localStorage array. If not, set a void array.
    const cartArr = getLocalStorage("so-cart") || [];
    // Push data to array.
    cartArr.push(product);

    // Set localStorage with modified array.
    setLocalStorage("so-cart", cartArr);
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
