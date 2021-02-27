<template lang="html">
  <sui-grid class="center" :container="true">
    <sui-grid-row class="middle aligned" :centered="true">
      <sui-grid-column :width="5" :mobile="12" :tablet="7" :computer="5">
        <register-card />
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
import RegisterCard from "../components/RegisterCard";

export default {
  name: "Login",
  components: {
    RegisterCard
  }
};
</script>

<style scoped>
.center {
  width: 100%;
  height: 100vh;
}
</style>
