<template lang="html">
  <div>
    <sui-menu attached="top">
      <sui-menu-menu>
        <sui-menu-item>
          <search-bar></search-bar>
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-segment attached="bottom" class="center">
      <div>
        <sui-card-group :items-per-row="6" stackable>
          <sui-card
            @click="addToCart(product)"
            v-for="(product, index) in getProducts"
            :key="index"
            class="show"
          >
            <sui-card-content>
              <sui-card-header>{{ product.productName }}</sui-card-header>
              <sui-card-meta>{{ product.category }}</sui-card-meta>
            </sui-card-content>
            <sui-card-content extra class="onhover-hide">
              {{ availibility(product.available) }}
            </sui-card-content>
            <sui-card-content extra class="onhover-show">
              Price: ₹{{ product.price }}
            </sui-card-content>
          </sui-card>
        </sui-card-group>
      </div>
    </sui-segment>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SearchBar from "../components/SearchBar";

export default {
  name: "ProductListView",
  components: {
    SearchBar
  },
  computed: {
    ...mapGetters(["getProducts"])
  },
  methods: {
    ...mapActions(["updateCart"]),
    availibility(units) {
      if (units > 0) {
        return "In Stock";
      } else if (units == 0) {
        return "Out of Stock";
      }
    },
    addToCart(product) {
      if (!product.count) product.count = 1;
      else product.count += 1;

      this.updateCart(product);
    }
  }
};
</script>

<style scoped>
.center {
  width: 100%;
  height: 82vh;
  overflow: scroll;
}
.show {
  transition: all 2s;
}
.onhover-hide {
  display: block;
}

.onhover-show {
  display: none;
}

.show:hover .onhover-show {
  display: block;
}

.show:hover .onhover-hide {
  display: none;
}
</style>
