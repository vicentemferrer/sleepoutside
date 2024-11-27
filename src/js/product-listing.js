import { qs, loadHeaderFooter, getParams } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";


loadHeaderFooter(setCounter);

const category = getParams("category");

const dataSource = new ProductData(category);
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
        const productData = new ProductData();
        const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
        const searchResults = await productData.searchProducts(searchQuery, categories);
        const productListContainer = qs(".product-list")
        if (searchResults.length === 0) {
            productListContainer.innerHTML = "<p>No products found.</p>";
            return;
        }
        productListContainer.innerHTML = "";
        // Render search results on the product list page
        const productList = new ProductList(searchQuery, searchResults, productListContainer);
        productList.renderList(searchResults);

    } catch (error) {
        console.error("Error fetching search results:", error);
        alert("Failed to fetch search results. Please try again.");
    }
});



