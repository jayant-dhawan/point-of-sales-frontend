<template>
  <sui-table basic="very">
    <sui-table-header>
      <sui-table-row>
        <sui-table-header-cell style="width: 50%"
          >Product</sui-table-header-cell
        >
        <sui-table-header-cell>Price</sui-table-header-cell>
        <sui-table-header-cell>Quantity</sui-table-header-cell>
        <sui-table-header-cell>Total</sui-table-header-cell>
      </sui-table-row>
    </sui-table-header>
    <sui-table-body>
      <sui-table-row v-for="item in getCart.products" :key="item._id">
        <sui-table-cell>{{ item.productName }}</sui-table-cell>
        <sui-table-cell>{{ item.price }}</sui-table-cell>
        <sui-table-cell
          ><sui-button
            compact
            icon="minus"
            @click="updateItemCount(item, 'sub')"
          />
          <sui-input
            style="width: 25%"
            size="mini"
            :value="item.count"
            disabled
          />
          <sui-button
            compact
            icon="plus"
            @click="updateItemCount(item, 'add')"
          />
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
      if (operation === "add" && item.count < item.available) {
        item.count += 1;
      } else if (operation === "sub") {
        item.count -= 1;
      }
      this.updateCart(item);
    }
  }
};
</script>
