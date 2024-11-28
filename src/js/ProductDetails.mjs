import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import { alertMessage } from "./Alerts.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
  }

  async init(isModal = false) {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!isModal) {
      this.renderProductDetails();
      qs("#addToCart").addEventListener("click", this.addToCart.bind(this));
    } else {
      this.renderModal();
    }
  }

  addToCart() {
    // Retrieve localStorage array. If not, set a void array.
    const cartArr = getLocalStorage("so-cart") || [];
    let found = false;
    cartArr.map((obj) => {
      if (this.product.Id === obj.Id) {
        obj["qty"] = parseInt(obj.qty) + 1;
        found = true;
      }
    });

    if (!found) {
      this.product["qty"] = 1;
      cartArr.push(this.product);
    }
    // Set localStorage with modified array.
    setLocalStorage("so-cart", cartArr);
    setCounter();
    alertMessage("Product added to cart!");
  }

  renderModal() {
    const modal = qs("#modal");

    const brandH3 = qs("h3", modal);
    const nameWBH2 = qs("h2", modal);
    const productAlt = qs("source", modal);
    const productImg = qs("img", modal);
    const pricePara = qs(".product-card__price", modal);
    const colorPara = qs(".product__color", modal);
    const descriptionPara = qs(".product__description", modal);

    brandH3.textContent = this.product.Brand.Name;
    nameWBH2.textContent = this.product.NameWithoutBrand;
    productAlt.setAttribute("srcset", this.product.Images.PrimaryMedium);
    productImg.setAttribute("src", this.product.Images.PrimaryMedium);
    productImg.setAttribute("alt", this.product.Name);
    pricePara.textContent = `$${this.product.FinalPrice}`;
    colorPara.textContent = this.product.Colors.reduce(
      (acc, color, i, arr) =>
        acc + color.ColorName + (i < arr.length - 1 ? ", " : ""),
      "",
    );
    descriptionPara.innerHTML = this.product.DescriptionHtmlSimple;
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
    const productAlt = qs("source", clone);
    const productImg = qs("img", clone);
    const pricePara = qs(".product-card__price", clone);
    const colorPara = qs(".product__color", clone);
    const descriptionPara = qs(".product__description", clone);
    const addButton = qs("#addToCart", clone);

    // Set custom comtent based on product requested
    brandH3.textContent = this.product.Brand.Name;
    nameWBH2.textContent = this.product.NameWithoutBrand;
    productAlt.setAttribute("srcset", this.product.Images.PrimaryLarge);
    productImg.setAttribute("src", this.product.Images.PrimaryMedium);
    productImg.setAttribute("alt", this.product.Name);
    pricePara.textContent = `$${this.product.FinalPrice}`;
    colorPara.textContent = this.product.Colors.reduce(
      (acc, color, i, arr) =>
        acc + color.ColorName + (i < arr.length - 1 ? ", " : ""),
      "",
    );
    descriptionPara.innerHTML = this.product.DescriptionHtmlSimple;
    addButton.setAttribute("data-id", this.product.Id);

    // Append customized template to main view
    productDetailElement.appendChild(clone);
  }
}
