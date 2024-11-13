import { getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParams("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);

product.init().then((prod) => prod.renderProductDetails());

// add to cart button event handler
async function addToCartHandler() {
    product.addToCart();
}

// add listener to Add to Cart button
document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
