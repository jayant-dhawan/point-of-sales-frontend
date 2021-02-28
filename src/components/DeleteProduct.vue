<template>
  <sui-button
    floated="left"
    size="mini"
    compact
    icon="trash"
    @click.stop="deleteProduct()"
  />
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../configs";

export default {
  name: "DeleteProduct",
  props: ["id"],
  methods: {
    ...mapActions(["setProducts"]),
    async deleteProduct() {
      Swal.showLoading();
      try {
        const user = JSON.parse(window.localStorage.getItem("user"));

        const response = await axios.delete(
          `${BASE_URL}product?id=${this.id}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`
            }
          }
        );

        if (response.data.status === "FAILED") {
          return Swal.fire("ERROR", response.data.errorMessage, "error");
        } else if (response.data.errorName == "UnauthorizedError") {
          return this.$router.push("/logout");
        }

        const products = await axios.get(BASE_URL + "product", {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });

        if (products.data.status === "FAILED") {
          return Swal.fire("ERROR", products.data.errorMessage, "error");
        } else if (products.data.errorName == "UnauthorizedError") {
          return this.$router.push("/logout");
        }

        Swal.fire("SUCCESS", "Product deleted from database", "success");
        this.setProducts(products.data.data);
      } catch (error) {
        Swal.fire("ERROR", error.message, "error");
      }
    }
  }
};
</script>
