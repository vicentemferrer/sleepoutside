const baseURL = import.meta.env.VITE_SERVER_URL;
import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.quantity = 1;
        this.product = {};
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        //this.product = await this.dataSource.findProductById(this.productId);
        //console.log(this.product);
        this.renderProductDetails();

        // Add event listener using Function.prototype.bind() method
        // which returns a new function with current instance settled as
        // 'this' inner function context.
        qs("#addToCart").addEventListener("click", this.addToCart.bind(this));
    }

    addToCart() {
        // Retrieve localStorage array. If not, set a void array.
        const cartArr = getLocalStorage("so-cart") || [];
        // Push data to array.
        cartArr.push([this.product, this.quantity]);
        //console.log(cartArr);
        // Set localStorage with modified array.
        setLocalStorage("so-cart", cartArr);
    }

    renderProductDetails() {
        // Set title for custom product page
        qs("title", document.head).innerHTML =
            `Sleep Outside | ${this.product.Name}`;

        // Get product detail node
        const productDetailElement = qs(".product-detail");
        // Get product detail template content
        const productTemplate = qs("#product-template");

        // Clone template content
        const clone = productTemplate.content.cloneNode(true);

        // Locate template pieces to customize content
        const brandH3 = qs("h3", clone);
        const nameWBH2 = qs("h2", clone);
        const productImg = qs("img", clone);
        const pricePara = qs(".product-card__price", clone);
        const colorPara = qs(".product__color", clone);
        const descriptionPara = qs(".product__description", clone);
        const quantity = qs(".product__quantity", clone);
        const addButton = qs("#addToCart", clone);

        // Set custom comtent based on product requested
        brandH3.textContent = this.product.Brand.Name;
        nameWBH2.textContent = this.product.NameWithoutBrand;
        productImg.setAttribute("src", this.product.Images.PrimaryLarge);
        productImg.setAttribute("alt", this.product.Name);
        pricePara.textContent = this.product.ListPrice;
        colorPara.textContent = this.product.Colors.reduce(
            (acc, color, i, arr) => {
                acc += color.ColorName;
                if (i > arr.length - 1) acc += ", ";

                return acc;
            },
            "",
        );
        descriptionPara.innerHTML = this.product.DescriptionHtmlSimple;
        quantity.value = "1";
        addButton.setAttribute("data-id", this.product.Id);

        // Append customized template to main view
        productDetailElement.appendChild(clone);
    }
}
