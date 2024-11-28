import {
  renderListWithTemplate,
  loadImage,
  qs,
  toTitleCase,
} from "./utils.mjs";

function productCardTemplate(product) {
  const templateLiteral = `<li class="product-card">
            <a href="../product_pages/?product=${product.Id}">
                <picture>
                    <source media="(min-width: 768px)" srcset="${product.Images.PrimaryMedium}" />
                    <img src="${product.Images.PrimarySmall}" alt="${product.Name}" />
                </picture>
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.NameWithoutBrand}</h2>
                <p class="product-card__price">$${product.ListPrice}</p>
            </a>
        </li>`;
  return templateLiteral;
}

async function filterProductList(list) {
  const productPromises = list.map(async (product) => {
    const path = product.Images.PrimaryMedium;

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
    // Ensure category is a valid string before calling toTitleCase
    this.category = category ? toTitleCase(category) : "Unknown Category"; // Fallback to a default category if invalid

    // this.category = toTitleCase(category);
    this.listElement = listElement;
    this.dataSource = dataSource;
  }

  async init() {
    qs("title", document.head).innerHTML = `Sleep Outside | ${this.category}`;
    qs(".products > h2").textContent = `Top Products: ${this.category}`;

    const productList = await this.dataSource.getData(
      this.category.toLowerCase(),
    );
    this.renderList(await filterProductList(productList));
  }

  renderList(productList) {
    renderListWithTemplate(productCardTemplate, this.listElement, productList);
  }
}
