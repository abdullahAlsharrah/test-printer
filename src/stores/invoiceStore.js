// import axios from "axios";
import { makeAutoObservable, runInAction } from "mobx";
import branchStore from "./branchStore";
import instance from "./instance";

class InvoiceStore {
  items = [];
  loading = true;
  discount = 0;

  constructor() {
    makeAutoObservable(this);
  }

  setDiscount = async (discount) => {
    runInAction(() => {
      this.discount = discount;
    });
  };

  addItemToInvoice = async (newItem) => {
    const foundItem = this.items.find((item) => item.itemId === newItem.itemId);
    if (foundItem) {
      return (
        (foundItem.quantity = foundItem.quantity + 1),
        (foundItem.price = newItem.item_price * foundItem.quantity)
      );
    } else {
      runInAction(() => {
        this.items.push(newItem);
      });
    }
  };

  quantityItem = async (newItem) => {
    if (newItem.quantity <= 1) {
      this.removeItemFromInvoice(newItem.itemId);
    } else {
      const foundItem = this.items.find(
        (item) => item.itemId === newItem.itemId
      );
      return (
        (foundItem.quantity = foundItem.quantity - 1),
        (foundItem.price = newItem.item_price * foundItem.quantity)
      );
    }
  };

  get totalPrice() {
    let total = 0;

    this.items.forEach((item) => {
      total += item.price;
    });
    return total - total * this.discount;
  }

  removeItemFromInvoice = async (itemId) => {
    runInAction(() => {
      this.items = this.items.filter((item) => item.itemId !== itemId);
    });
  };

  cancelCheckout = async () => {
    runInAction(() => {
      this.items = [];
    });
  };

  checkout = async (phone_number, payment, date) => {
    try {
      const invoice = {
        items: this.items,
        price: this.totalPrice,
        phone_number: phone_number,
        payment: payment,
        date: date,
        discount: this.discount,
      };
      await instance.post(
        `/invoices/checkout/${branchStore.branch.vendorId}/${branchStore.branch.id}`,
        invoice
      );
      // await axios.post(
      //   `http://localhost:8080/invoices/checkout_online`,
      //   invoice
      // );
      runInAction(() => {
        this.items = [];
      });
      alert("You have successfully checked out.");
    } catch (error) {
      console.log(error);
    }
  };
}

const invoiceStore = new InvoiceStore();
export default invoiceStore;
