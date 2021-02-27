<template lang="html">
  <sui-grid class="center" :container="true">
    <sui-grid-row class="middle aligned" :centered="true">
      <sui-grid-column :width="5" :mobile="12" :tablet="7" :computer="5">
        <login-card />
      </sui-grid-column>
    </sui-grid-row>
  </sui-grid>
</template>

<script>
import LoginCard from "../components/LoginCard";

export default {
  name: "Login",
  components: {
    LoginCard
  }
};
</script>

<style scoped>
.center {
  width: 100%;
  height: 100vh;
}
</style>
