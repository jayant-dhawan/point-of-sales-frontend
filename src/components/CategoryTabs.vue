<template>
  <h3 is="sui-header" block>
    <sui-header-content>
      <sui-button @click="setCategory('')">All</sui-button>
      <sui-button
        @click="setCategory(category)"
        v-for="(category, index) in categories"
        :key="index"
        >{{ category.toUpperCase() }}</sui-button
      >
    </sui-header-content>
  </h3>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CategoryTabs",
  props: ["categories"],
  methods: {
    ...mapActions(["setCategory"])
  }
};
</script>
