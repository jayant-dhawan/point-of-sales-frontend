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
            v-for="(product, index) in getProducts"
            :key="index"
            class="show"
          >
            <sui-card-content>
              <sui-card-header>{{ product.productName }}</sui-card-header>
              <sui-card-meta>{{ product.category }}</sui-card-meta>
            </sui-card-content>
            <sui-card-content extra class="onhover">
              Price: {{ product.price }}
            </sui-card-content>
          </sui-card>
        </sui-card-group>
      </div>
    </sui-segment>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchBar from "../components/SearchBar";

export default {
  name: "ProductListView",
  components: {
    SearchBar
  },
  computed: {
    ...mapGetters(["getProducts"])
  }
};
</script>

<style scoped>
.center {
  width: 100%;
  height: 85vh;
}
.show {
  transition: all 2s;
}
.onhover {
  opacity: 0;
}
.show:hover .onhover {
  opacity: 1;
}
</style>
