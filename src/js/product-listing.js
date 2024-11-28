import { qs, loadHeaderFooter, getParams } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter(setCounter);

const category = getParams("category");

const dataSource = new ExternalServices();
const productList = new ProductList(category, dataSource, qs(".product-list"));

productList.init();

// Elements
const searchForm = qs("#searchForm");
const searchInput = qs("#searchInput");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevent default form submission behavior

  const searchQuery = searchInput.value.trim(); // Get search keyword
  if (!searchQuery) {
    alert("Please enter a product name to search.");
    return;
  }

  try {
    // Fetch search results from the API
    const productData = new ExternalServices();
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    const searchResults = await productData.searchProducts(
      searchQuery,
      categories,
    );
    const productListContainer = qs(".product-list");
    if (searchResults.length === 0) {
      productListContainer.innerHTML = "<p>No products found.</p>";
      return;
    }
    productListContainer.innerHTML = "";
    // Render search results on the product list page
    const list = new ProductList(
      searchQuery,
      searchResults,
      productListContainer,
    );
    list.renderList(searchResults);
  } catch (error) {
    alert("Failed to fetch search results. Please try again.");
  }
});
