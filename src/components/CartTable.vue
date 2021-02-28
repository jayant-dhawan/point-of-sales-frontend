<template>
  <sui-table basic="very">
    <sui-table-header>
      <sui-table-row>
        <sui-table-header-cell>Product</sui-table-header-cell>
        <sui-table-header-cell>Price</sui-table-header-cell>
        <sui-table-header-cell>Quantity</sui-table-header-cell>
        <sui-table-header-cell>Total</sui-table-header-cell>
      </sui-table-row>
    </sui-table-header>
    <sui-table-body>
      <sui-table-row v-for="(item, index) in getCart.products" :key="index">
        <sui-table-cell>{{ item.productName }}</sui-table-cell>
        <sui-table-cell>{{ item.price }}</sui-table-cell>
        <sui-table-cell
          ><sui-button @click="updateItemCount(item, 'sub')">-</sui-button>
          <sui-input size="mini" :value="item.count" />
          <sui-button @click="updateItemCount(item, 'add')">+</sui-button>
        </sui-table-cell>
        <sui-table-cell>{{ item.count * item.price }}</sui-table-cell>
      </sui-table-row>
    </sui-table-body>
  </sui-table>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "CartTable",
  computed: {
    ...mapGetters(["getCart"])
  },
  methods: {
    ...mapActions(["updateCart"]),
    updateItemCount(item, operation) {
      console.log(this.getCart);
      if (operation === "add") {
        item.count += 1;
      } else if (operation === "sub") {
        item.count -= 1;
      }
      this.updateCart(item);
    }
  }
};
</script>
