<template lang="html">
  <div>
    <sui-menu attached="top">
      <sui-menu-menu>
        <sui-menu-item>
          Cart
        </sui-menu-item>
      </sui-menu-menu>
    </sui-menu>

    <sui-segment attached="bottom" class="segment-mid">
      <h3 v-if="!getCart.products.length">Product list is empty</h3>
      <cart-table v-if="getCart.products.length"></cart-table>
    </sui-segment>
    <sui-segments class="segment-bottom">
      <sui-segment
        ><b>Sub Total:</b>
        <span> {{ getCart.products.length }} Items</span>
        <span class="fr">{{
          getCart.subTotal == 0 ? "NA" : "₹ " + getCart.subTotal
        }}</span></sui-segment
      >
      <sui-segment
        ><b>VAT: </b>
        <span class="fr">{{
          getCart.vat == 0 ? "NA" : "₹ " + getCart.vat
        }}</span>
        <sui-input
          size="mini"
          class="fr"
          v-model="newVat"
          placeholder="Enter new VAT"
      /></sui-segment>

      <sui-segment
        ><b>Discount:</b>
        <span class="fr">{{
          getCart.discount == 0 ? "NA" : "₹ " + getCart.discount
        }}</span></sui-segment
      >
      <sui-segment
        ><b>Total:</b>
        <span class="fr">{{
          getCart.total == 0 ? "NA" : "₹ " + getCart.total
        }}</span></sui-segment
      >
      <sui-segment>
        <sui-button @click="cancelSale()" negative floated="left"
          >Cancel Sale</sui-button
        >
        <receipt-modal></receipt-modal>
      </sui-segment>
    </sui-segments>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import CartTable from "../components/CartTable";
import ReceiptModal from "../components/ReceiptModal";
import Swal from "sweetalert2";

export default {
  name: "Cart",
  data() {
    return {
      newVat: ""
    };
  },
  components: {
    CartTable,
    ReceiptModal
  },
  computed: {
    ...mapGetters(["getCart"])
  },
  watch: {
    newVat(val) {
      val = parseInt(val);
      if (isNaN(parseInt(val))) {
        val = 0;
      }
      this.updateNewVat(val);
    }
  },
  methods: {
    ...mapActions(["emptyCart", "updateNewVat"]),
    cancelSale() {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel sale!",
        cancelButtonText: "No, donot cancel!",
        reverseButtons: true
      }).then(result => {
        if (result.isConfirmed) {
          this.emptyCart();
          Swal.fire("Sale Canceled!", "Cart is cleared", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire("Aborted", "Your cart is safe", "error");
        }
      });
    }
  }
};
</script>

<style scoped>
.segment-mid {
  width: 100%;
  height: 58vh;
  overflow: scroll;
}
.segment-bottom {
  width: 100%;
  height: 30vh;
}
.fr {
  float: right;
}
</style>
