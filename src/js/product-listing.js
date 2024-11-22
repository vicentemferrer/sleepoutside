import { qs, getParams } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductListing from "./ProductList.mjs";
import { setCounter } from "./cart-counter.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter(setCounter);

const category = getParams("category");

 // Set title for custom product page
const title  = qs("title", document.head);
title.innerHTML = title.innerHTML+`${category}`;

const categoryText = qs("#category-h2");
categoryText.innerHTML = categoryText.innerHTML + ` ${category}`;

const dataSource = new ProductData();
const productList = new ProductListing(
    category,
    dataSource,
    qs(".product-list"),
);
productList.init();