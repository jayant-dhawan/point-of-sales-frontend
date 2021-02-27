<template lang="html">
  <div>
    <sui-card>
      <sui-card-content>
        <sui-card-header> Login </sui-card-header>
      </sui-card-content>
      <sui-card-content>
        <sui-form>
          <sui-form-field>
            <label>Email</label>
            <input placeholder="Email" v-model="email" />
          </sui-form-field>
          <sui-form-field>
            <label>Password</label>
            <input placeholder="Password" type="password" v-model="password" />
          </sui-form-field>
          <sui-form-field>
            New Here? <router-link to="/register">Register</router-link>
          </sui-form-field>
        </sui-form>
      </sui-card-content>
      <sui-card-content extra>
        <sui-button @click="login" floated="right">Login</sui-button>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../configs";

export default {
  name: "LoginCard",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    ...mapActions(["setUser"]),
    async login() {
      Swal.showLoading();

      if (!this.email) {
        Swal.hideLoading();
        return Swal.fire("ERROR", "Email is empty", "error");
      }
      if (!this.password) {
        Swal.hideLoading();
        return Swal.fire("ERROR", "Password is empty", "error");
      }

      try {
        const req = { email: this.email, password: this.password };

        const response = await axios.post(BASE_URL + "login", req);

        if (response.data.status === "FAILED") {
          return Swal.fire("ERROR", response.data.errorMessage, "error");
        }

        this.setUser(response.data.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.data.token}`;

        Swal.hideLoading();
        Swal.fire("SUCCESS", "Successfully Logged in", "success");
        this.$router.push("/dashboard");
      } catch (error) {
        Swal.hideLoading();
        Swal.fire("ERROR", error.message, "error");
      }
    }
  }
};
</script>
