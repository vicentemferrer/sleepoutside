import { getLocalStorage, qs } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const packagedItems = items.map((item) => ({
    id: item.Id,
    price: item.FinalPrice,
    name: item.Name,
    quantity: item.qty,
  }));

  return packagedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemCount = 0;
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSummary();
    this.calculateOrderTotal();

    qs("form").addEventListener("submit", (e) => {
      e.preventDefault();

      this.checkout();
    });
  }

  calculateItemSummary() {
    const subtotalElement = qs(`${this.outputSelector} #cartTotal`);
    const itemNumElement = qs(`${this.outputSelector} #num-items`);

    this.itemCount = this.list.reduce((acc, item) => acc + item.qty, 0);
    itemNumElement.textContent = this.itemCount;

    this.itemTotal = this.list.reduce(
      (sum, item) => sum + item.FinalPrice * item.qty,
      0,
    );
    subtotalElement.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Calculate shipping ($10 for the first item, $2 for each additional item)
    this.shipping = 10 + (this.itemCount - 1) * 2;

    // Calculate tax (6% of subtotal)
    this.tax = this.itemTotal * 0.06;

    // Calculate order total
    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    const shipping = qs(`${this.outputSelector} #shipping`);
    const tax = qs(`${this.outputSelector} #tax`);
    const orderTotal = qs(`${this.outputSelector} #orderTotal`);

    shipping.textContent = `$${this.shipping.toFixed(2)}`;
    tax.textContent = `$${this.tax.toFixed(2)}`;
    orderTotal.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  async checkout() {
    const formElement = document.forms["checkout"];

    const json = formDataToJSON(formElement);
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  }
}
