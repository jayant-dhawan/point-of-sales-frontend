<template lang="html">
  <div>
    <sui-card>
      <sui-card-content>
        <sui-card-header> Register </sui-card-header>
      </sui-card-content>
      <sui-card-content>
        <sui-form>
          <sui-form-field>
            <label>Name</label>
            <input placeholder="Your Name" v-model="name" />
          </sui-form-field>
          <sui-form-field>
            <label>Email</label>
            <input placeholder="Your Email" v-model="email" />
          </sui-form-field>
          <sui-form-field>
            <label>Password</label>
            <input
              placeholder="Your Password"
              type="password"
              v-model="password"
            />
          </sui-form-field>
          <sui-form-field>
            Already a user? <router-link to="/">Login</router-link>
          </sui-form-field>
        </sui-form>
      </sui-card-content>
      <sui-card-content extra>
        <sui-button @click="register()" floated="right">Register</sui-button>
      </sui-card-content>
    </sui-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../configs";

export default {
  name: "RegisterCard",
  data: () => ({
    email: "",
    password: "",
    name: ""
  }),
  methods: {
    async register() {
      Swal.showLoading();

      if (!this.name) {
        Swal.hideLoading();
        return Swal.fire("ERROR", "Name is empty", "error");
      }
      if (!this.email) {
        Swal.hideLoading();
        return Swal.fire("ERROR", "Email is empty", "error");
      }
      if (!this.password) {
        Swal.hideLoading();
        return Swal.fire("ERROR", "Password is empty", "error");
      }

      try {
        const req = {
          email: this.email,
          password: this.password,
          name: this.name
        };

        const response = await axios.post(BASE_URL + "signup", req);

        if (response.data.status === "FAILED") {
          return Swal.fire("ERROR", response.data.errorMessage, "error");
        }

        Swal.hideLoading();
        Swal.fire(
          "SUCCESS",
          "Successfully Registered, please login",
          "success"
        );

        this.$router.push("/");
      } catch (error) {
        Swal.hideLoading();
        Swal.fire("ERROR", error.message, "error");
      }
    }
  }
};
</script>
