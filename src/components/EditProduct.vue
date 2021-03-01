<template lang="html">
  <div>
    <sui-button
      floated="left"
      size="mini"
      compact
      icon="edit"
      @click.stop="toggle"
    />
    <sui-modal v-model="open">
      <sui-modal-header>Add Product</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-modal-description>
          <sui-header>Enter Product Information</sui-header>
          <sui-form @submit.prevent>
            <sui-form-field>
              <label>Product Name</label>
              <input
                v-model="newProduct.productName"
                placeholder="Enter Product Name"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Category</label>
              <input
                v-model="newProduct.category"
                placeholder="Enter Product Category"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Price (in Rupees)</label>
              <input
                v-model="newProduct.price"
                placeholder="Enter Product Price (in Rupees)"
                type="number"
                min="0"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Available Uints</label>
              <input
                v-model="newProduct.available"
                placeholder="Enter Available Units"
                type="number"
                min="0"
              />
            </sui-form-field>
            <sui-form-field>
              <label>VAT (in %)</label>
              <input
                v-model="newProduct.vat"
                placeholder="Enter Value Added Tax (in %)"
                type="number"
                min="0"
                max="100"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Discount (in %)</label>
              <input
                v-model="newProduct.discount"
                placeholder="Enter Discount (in %)"
                type="number"
                min="0"
                max="100"
              />
            </sui-form-field>
            <sui-button floated="right" @click="addProduct()"
              >Update</sui-button
            >
          </sui-form>
        </sui-modal-description>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click.stop.native="toggle">
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../configs";

export default {
  name: "EditProduct",
  props: ["product"],
  data() {
    return {
      open: false,
      newProduct: {
        productName: "",
        category: "",
        price: 0,
        available: 0,
        vat: 0,
        discount: 0
      }
    };
  },
  mounted() {
    this.newProduct = this.product;
  },
  methods: {
    ...mapActions(["setProducts"]),
    async addProduct() {
      this.open = !this.open;
      Swal.showLoading();

      const product = this.newProduct;
      product.productName = product.productName.toLowerCase();
      product.category = product.category.toLowerCase();

      try {
        const user = JSON.parse(window.localStorage.getItem("user"));
        const headers = { headers: { Authorization: `Bearer ${user.token}` } };
        const response = await axios.put(
          `${BASE_URL}product`,
          product,
          headers
        );

        if (response.data.status === "FAILED") {
          return Swal.fire("ERROR", response.data.errorMessage, "error");
        } else if (response.data.errorName == "UnauthorizedError") {
          return this.$router.push("/logout");
        }

        const products = await axios.get(`${BASE_URL}product`, headers);

        if (products.data.status === "FAILED") {
          return Swal.fire("ERROR", products.data.errorMessage, "error");
        } else if (products.data.errorName == "UnauthorizedError") {
          return this.$router.push("/logout");
        }

        this.setProducts(products.data.data);
        Swal.fire("SUCCESS", "Product updated in database", "success");
      } catch (error) {
        Swal.fire("ERROR", error.message, "error");
      }
    },
    toggle() {
      this.open = !this.open;
    }
  }
};
</script>
