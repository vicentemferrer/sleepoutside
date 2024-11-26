import { getParams, loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter(setCounter);

const productId = getParams("product");
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();
