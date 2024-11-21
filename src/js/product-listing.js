import { qs, loadHeaderFooter, getParams } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(setCounter);

const category = getParams("category");

const dataSource = new ProductData(category);
const productList = new ProductList(category, dataSource, qs(".product-list"));

productList.init();
