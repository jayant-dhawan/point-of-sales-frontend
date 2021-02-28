<template lang="html">
  <sui-input
    transparent
    placeholder="Search..."
    icon="search"
    v-model="search"
    v-on:keyup="setName(search)"
  />
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "SearchBar",
  data() {
    return {
      search: ""
    };
  },
  methods: {
    ...mapActions(["setName"])
  }
};
</script>
