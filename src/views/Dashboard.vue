<template>
  <sui-grid class="center container-fluid">
    <sui-grid-row style="padding-left: 3vh">
      <sui-grid-column
        :width="6"
        :mobile="16"
        :tablet="16"
        :computer="6"
        class="pt"
      >
        <cart></cart>
      </sui-grid-column>
      <sui-grid-column
        :width="10"
        :mobile="16"
        :tablet="16"
        :computer="10"
        class="pt"
      >
        <category-tabs :categories="getCategories"></category-tabs>
        <product-list-view></product-list-view>
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";

import CategoryTabs from "../components/CategoryTabs";
import Cart from "../components/Cart";

import { BASE_URL } from "../../configs";
import ProductListView from "../components/ProductListView.vue";

export default {
  name: "Dashboard",
  components: {
    CategoryTabs,
    ProductListView,
    Cart
  },
  computed: {
    ...mapGetters(["getProducts", "getCategories"])
  },
  async created() {
    try {
      const { token } = JSON.parse(window.localStorage.getItem("user"));

      const response = await axios.get(BASE_URL + "product", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.status === "FAILED") {
        Swal.fire("ERROR", response.data.errorMessage, "error");
      }

      this.setProducts(response.data.data);
    } catch (error) {
      Swal.fire("ERROR", error.message, "error");
    }
  },
  methods: {
    ...mapActions(["setProducts"])
  }
};
</script>

<style scoped>
.center {
  width: 100%;
  height: 100vh;
}

.pt {
  padding-top: 2vh;
}
</style>
