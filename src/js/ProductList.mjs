import { qs, renderListWithTemplate, loadImage } from "./utils.mjs";

function productCardTemplate(product) {
    // Get product card template
    const cardTemplate = qs("#card-template");

    // Clone template content
    const clone = cardTemplate.content.cloneNode(true);

    // Locate template pieces to customize content
    const productAnchor = qs("a", clone);
    const productImg = qs("img", clone);
    const brandH3 = qs("h3", clone);
    const nameWBH2 = qs("h2", clone);
    const pricePara = qs(".product-card__price", clone);

    // Set custom comtent based on product requested
    productAnchor.setAttribute("href", `product_pages/?product=${product.Id}`);
    brandH3.textContent = product.Brand.Name;
    nameWBH2.textContent = product.NameWithoutBrand;
    productImg.setAttribute(
        "src",
        product.Image.split("/")
            .filter((pathFr) => pathFr !== "..")
            .join("/"),
    );
    productImg.setAttribute("alt", product.Name);
    pricePara.textContent = product.ListPrice;

    return clone;
}

async function filterProductList(list) {
    const productPromises = list.map(async (product) => {
        const path = `${window.location.origin}/${product.Image.split("/")
            .filter((pathFr) => pathFr !== "..")
            .join("/")}`;

        try {
            await loadImage(path);
            return product;
        } catch (error) {
            return null;
        }
    });

    const productList = await Promise.allSettled(productPromises);

    return productList
        .filter(({ status, value }) => status === "fulfilled" && value !== null)
        .map((product) => product.value);
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData();

        const productList = await filterProductList(list);

        this.renderList(productList);
    }

    renderList(list) {
        renderListWithTemplate(
            productCardTemplate,
            this.listElement,
            list,
            true,
        );
    }
}
