import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);

        return this;
    }

    addToCart() {
        // Retrieve localStorage array. If not, set a void array.
        const cartArr = getLocalStorage("so-cart") || [];
        // Push data to array.
        cartArr.push(this.product);

        // Set localStorage with modified array.
        setLocalStorage("so-cart", cartArr);
    }

    renderProductDetails() {
        const productDetailElement = qs(".product-detail");

        productDetailElement.innerHTML = `<h3>${this.product.Brand.Name}</h3>

                <h2 class="divider">${this.product.NameWithoutBrand}</h2>

                <img
                    class="divider"
                    src="${this.product.Image}"
                    alt="${this.product.Name}"
                />

                <p class="product-card__price">${this.product.ListPrice}</p>

                <p class="product__color">${this.product.Colors.reduce(
                    (acc, color, i, arr) => {
                        acc += color.ColorName;
                        if (i > arr.length - 1) acc += ", ";

                        return acc;
                    },
                    "",
                )}</p>

                <p class="product__description">
                    ${this.product.DescriptionHtmlSimple}
                </p>

                <div class="product-detail__add">
                    <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
                </div>`;
    }
}
