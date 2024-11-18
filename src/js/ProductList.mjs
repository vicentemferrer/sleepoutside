import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    const templateLiteral =
        `<li class="product-card">
            <a href="product_pages/?product=${product.Id}">
                <img
                    src="${product.Image}"
                    alt="${product.Name}"
                />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>`;
    return templateLiteral;
}

export default class ProductListing {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.listElement = listElement;
        this.dataSource = dataSource;
    }

    async init() {
        const productList = await this.dataSource.getData();
        this.renderList(productList.slice(0, 4));
    }

    renderList(productList) {
        renderListWithTemplate(productCardTemplate, this.listElement, productList);
    }
}