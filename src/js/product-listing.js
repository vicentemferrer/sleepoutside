import { qs, loadHeaderFooter, getParams } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import ProductDetails from "./ProductDetails.mjs";


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
        const searchResults = await searchProducts(searchQuery);

        const dataSource = new ProductData();
        // Render search results on the product list page
        const product = new ProductDetails(searchResults, dataSource);
        product.init();

    } catch (error) {
        console.error("Error fetching search results:", error);
        alert("Failed to fetch search results. Please try again.");
    }
});

// Function to call the API
async function searchProducts(query) {
    const baseUrl = import.meta.env.VITE_SERVER_URL; // Ensure your base URL is correct
    const url = `${baseUrl}/search?query=${encodeURIComponent(query)}`;//Use encodeURIComponent(query) to safely encode the search query.

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json(); // Return JSON data
}

