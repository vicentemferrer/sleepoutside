import { qs } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";

const dataSource = new ProductData("/publicjson/tents");
const productList = new ProductListing(
    "tents",
    dataSource,
    qs(".product-list"),
);
productList.init();

