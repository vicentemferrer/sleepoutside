import {
    getLocalStorage, qs, loadHeaderFooter
} from "./utils.mjs";
import { setCounter } from "./cart-counter.mjs";
// import ShoppingCart from "./ShoppingCart.mjs";

loadHeaderFooter(setCounter);


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0;
        this.tax = 0;
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.totalItems = this.calculateItemSummary();
    }

    calculateItemSummary() {
        let totalItems2 = this.totalItems;
        totalItems2 = this.list.reduce((total, item) => total + parseFloat(item.qty), 0);
    }
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total

        // Calculate item subtotal
        const Subtotal = this.list.reduce((total, item) => total + parseFloat(item.FinalPrice) * parseFloat(item.qty), 0);
        // Calculate tax (6% of subtotal)
        const tax = Subtotal * 0.06;
        // Calculate shipping ($10 for the first item, $2 for each additional item)
        const shipping = this.totalItems > 0 ? 10 + (this.totalItems - 1) * 2 : 0;
        // Calculate order total
        this.orderTotal = Subtotal + tax + shipping;
        // display the totals.
        this.displayOrderTotals();
    }
    displayOrderTotals() {
        const SubtotalElement = qs(".subtotal");
        const taxElement = qs(".tax");
        const shippingElement = qs(".shipping");
        const orderTotalElement = qs(".order-total");
        // once the totals are all calculated display them in the order summary page
        SubtotalElement.innerHTML = Subtotal.toFixed(2);
        taxElement.innerHTML = tax.toFixed(2);
        shippingElement.innerHTML = shipping.toFixed(2);
        orderTotalElement.innerHTML = this.orderTotal.toFixed(2);
    }
};

const CheckoutProcess2 = new CheckoutProcess("so-cart", qs(".summary"));

checkout
CheckoutProcess2.init();

