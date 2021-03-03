<template>
  <h3 is="sui-header" block>
    <sui-header-content>
      <div v-if="categories.length <= 5">
        <sui-button @click="setCategory('')">All</sui-button>
        <sui-button
          @click="setCategory(category)"
          v-for="(category, index) in categories"
          :key="index"
          >{{ category.toUpperCase() }}</sui-button
        >
      </div>
      <div v-else>
        <sui-dropdown
          fluid
          :options="categoriesObj"
          placeholder="Select Category"
          search
          selection
          v-model="current"
        />
      </div>
    </sui-header-content>
  </h3>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CategoryTabs",
  props: ["categories"],
  data() {
    return {
      current: ""
    };
  },
  watch: {
    current(val) {
      this.setCategory(val);
    }
  },
  computed: {
    categoriesObj() {
      const obj = [{ text: "ALL", value: "" }];
      this.categories.forEach(element => {
        obj.push({ text: element.toUpperCase(), value: element });
      });
      return obj;
    }
  },
  methods: {
    ...mapActions(["setCategory"])
  }
};
</script>
