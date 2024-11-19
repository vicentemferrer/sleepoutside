import { qs, loadHeaderFooter } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

loadHeaderFooter(setCounter);

const dataSource = new ProductData("tents");
const productList = new ProductListing(
    "tents",
    dataSource,
    qs(".product-list"),
);
productList.init();
