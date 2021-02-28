<template lang="html">
  <div>
    <sui-button @click="processSale()" positive floated="right"
      >Process Sale</sui-button
    >
    <sui-modal v-model="open">
      <sui-modal-header>Receipt</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-modal-description>
          <sui-header>{{ id }}</sui-header>
          <sui-table basic="very">
            <sui-table-header>
              <sui-table-row>
                <sui-table-header-cell>Products</sui-table-header-cell>
                <sui-table-header-cell>Quantity</sui-table-header-cell>
                <sui-table-header-cell>SubTotal</sui-table-header-cell>
              </sui-table-row>
            </sui-table-header>
            <sui-table-body>
              <sui-table-row v-for="(product, index) in products" :key="index">
                <sui-table-cell>{{ product.productName }}</sui-table-cell>
                <sui-table-cell>{{ product.count }}</sui-table-cell>
                <sui-table-cell>{{
                  product.count * product.price
                }}</sui-table-cell>
              </sui-table-row>
              <sui-table-row>
                <sui-table-cell><b>Total Items</b></sui-table-cell>
                <sui-table-cell>{{ totalItems }}</sui-table-cell>
                <sui-table-cell>{{ subTotal }}</sui-table-cell>
              </sui-table-row>
              <sui-table-row>
                <sui-table-cell></sui-table-cell>
                <sui-table-cell><b>VAT</b></sui-table-cell>
                <sui-table-cell>{{ vat }}</sui-table-cell>
              </sui-table-row>
              <sui-table-row>
                <sui-table-cell></sui-table-cell>
                <sui-table-cell><b>Discount</b></sui-table-cell>
                <sui-table-cell>{{ totalDiscount }}</sui-table-cell>
              </sui-table-row>
              <sui-table-row>
                <sui-table-cell><b>Grand Total</b></sui-table-cell>
                <sui-table-cell></sui-table-cell>
                <sui-table-cell>{{ total }}</sui-table-cell>
              </sui-table-row>
            </sui-table-body>
          </sui-table>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../configs";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "ReceiptModal",
  data() {
    return {
      total: 0,
      vat: 0,
      subTotal: 0,
      totalItems: 0,
      totalDiscount: 0,
      products: [],
      open: false,
      id: ""
    };
  },
  computed: {
    ...mapGetters(["getCart"])
  },
  methods: {
    ...mapActions(["emptyCart"]),
    async processSale() {
      Swal.showLoading();
      const cart = this.getCart;

      if (cart.products.length == 0) {
        Swal.hideLoading();
        return;
      }

      const user = JSON.parse(window.localStorage.getItem("user"));

      let req = {
        employeeId: user.id,
        dateOfSale: Date.now(),
        totalDiscount: cart.discount,
        vat: cart.vat,
        total: cart.total,
        products: cart.products
      };

      try {
        const response = await axios.post(`${BASE_URL}sale`, req, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        const sale = response.data.data;

        if (response.data.status === "SUCCESS") {
          this.id = sale._id;
          this.total = sale.total;
          this.vat = sale.vat;
          this.products = sale.products;

          sale.products.forEach(element => {
            this.subTotal += element.price * element.count;
            this.totalItems += element.count;
            this.totalDiscount +=
              (element.discount * (element.price * element.count)) / 100;
          });
          this.emptyCart();
          Swal.fire({ title: "SUCCESS", toast: true, icon: "success" });
          this.open = !this.open;
        } else {
          Swal.fire("ERROR", response.errorMessage, "error");
        }
      } catch (error) {
        Swal.fire("ERROR", error.message, "error");
      }
    },
    toggle() {
      this.total = 0;
      this.vat = 0;
      this.subTotal = 0;
      this.totalItems = 0;
      this.products = [];
      this.id = "";
      this.totalDiscount = 0;
      this.emptyCart();
      this.open = !this.open;
    }
  }
};
</script>
