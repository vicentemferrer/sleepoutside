import { getParams, loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter(setCounter);

const productId = getParams("product");
const dataSource = new ExternalServices();
const product = new ProductDetails(productId, dataSource);
product.init();
