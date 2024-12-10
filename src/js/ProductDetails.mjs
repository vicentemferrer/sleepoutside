import { getLocalStorage, setLocalStorage, qs } from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
import { alertMessage } from "./Alerts.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = {};
    this.slideIndex = 0;
  }

  async init(isModal = false) {
    this.product = await this.dataSource.findProductById(this.productId);

    if (!isModal) {
      if(this.product.Images.ExtraImages){
        if(this.product.Images.ExtraImages.length > 0){
          this.slideIndex = this.product.Images.ExtraImages.length;
          qs(".pd-prev").style.display = "block";
          qs(".pd-prev").addEventListener("click", this.diffSlides.bind(this));
          qs(".pd-next").style.display = "block";
          qs(".pd-next").addEventListener("click", this.plusSlides.bind(this));
        }
      }
      this.renderProductDetails();
      qs("#pd-addToCart").addEventListener("click", this.addToCart.bind(this));
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

    const brandH3 = qs(".pd-brand");
    const nameWBH2 = qs(".pd-name");
    const pricePara = qs(".pd-price");
    const descriptionPara = qs(".pd-description");
    const addButton = qs("#pd-addToCart");
    const colorPara = qs(".pd-color");

    // Set custom comtent based on product requested
    brandH3.textContent = this.product.Brand.Name;
    nameWBH2.textContent = this.product.NameWithoutBrand;
    pricePara.textContent = `$${this.product.FinalPrice}`;
    descriptionPara.innerHTML = this.product.DescriptionHtmlSimple;
    addButton.setAttribute("data-id", this.product.Id);

    colorPara.textContent = this.product.Colors.reduce(
      (acc, color, i, arr) =>
        acc + color.ColorName + (i < arr.length - 1 ? ", " : ""),
      "",
    );
    
    if (this.slideIndex == 0){
      const productImg = qs(".pd-img");
      productImg.setAttribute("src", this.product.Images.PrimaryExtraLarge);
      productImg.setAttribute("alt", this.product.Name);
    }else{
      this.showSlides();
    }
  }

  // Next controls
  plusSlides() {
    this.slideIndex += 1;
    this.showSlides();
  }

  // previous controls
  diffSlides() {
    this.slideIndex += -1;
    this.showSlides();
  }

  showSlides() {    
    //const productAlt = qs(".pd-source");
    const productImg = qs(".pd-img");
    if (this.slideIndex == this.product.Images.ExtraImages.length){
      productImg.setAttribute("src", this.product.Images.PrimaryExtraLarge);
      productImg.setAttribute("alt", this.product.Name);
    }else if (this.slideIndex < 0) {
      this.slideIndex = this.product.Images.ExtraImages.length;
      productImg.setAttribute("src", this.product.Images.PrimaryExtraLarge);
      productImg.setAttribute("alt", this.product.Name);  
    }else if (this.slideIndex > this.product.Images.ExtraImages.length) {
      this.slideIndex = 0;
      productImg.setAttribute("src", this.product.Images.ExtraImages[this.slideIndex].Src);
      productImg.setAttribute("alt", this.product.Name);        
    }else{
      productImg.setAttribute("src", this.product.Images.ExtraImages[this.slideIndex].Src);
      productImg.setAttribute("alt", this.product.Name); 
    }
  }
}
