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
                v-model="product.productName"
                placeholder="Enter Product Name"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Category</label>
              <input
                v-model="product.category"
                placeholder="Enter Product Category"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Price (in Rupees)</label>
              <input
                v-model="product.price"
                placeholder="Enter Product Price (in Rupees)"
                type="number"
                min="0"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Available Uints</label>
              <input
                v-model="product.available"
                placeholder="Enter Available Units"
                type="number"
                min="0"
              />
            </sui-form-field>
            <sui-form-field>
              <label>VAT (in %)</label>
              <input
                v-model="product.vat"
                placeholder="Enter Value Added Tax (in %)"
                type="number"
                min="0"
                max="100"
              />
            </sui-form-field>
            <sui-form-field>
              <label>Discount (in %)</label>
              <input
                v-model="product.discount"
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

      const product = this.product;
      product.productName = product.productName.toLowerCase();
      product.category = product.category.toLowerCase();

      try {
        const { token } = JSON.parse(window.localStorage.getItem("user"));
        const response = await axios.put(BASE_URL + "product", product, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.status === "FAILED") {
          return Swal.fire("ERROR", response.data.errorMessage, "error");
        } else if (response.data.errorName == "UnauthorizedError") {
          return this.$router.push("/logout");
        }

        const products = await axios.get(BASE_URL + "product", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (products.data.status === "FAILED") {
          return Swal.fire("ERROR", products.data.errorMessage, "error");
        } else if (products.data.errorName == "UnauthorizedError") {
          return this.$router.push("/logout");
        }

        Swal.fire("SUCCESS", "Product updated in database", "success");
        this.setProducts(products.data.data);
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
