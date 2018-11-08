<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout column align-center>
        <form>
          <v-text-field v-model="email" label="email" type="email" required></v-text-field>
          <v-text-field v-model="password" label="password" type="password" required></v-text-field>
          <v-btn @click=" toSignIn">submit</v-btn>
        </form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>
<script>
import {
  VTextField
} from 'vuetify/lib'
import axios from "axios";
import firebase from "firebase";
import { mapState } from "vuex";
import store from "../store";

export default {
  components: {
    VTextField
  },
  data: () => ({
    email: '',
    password: ''
  }),

  mounted () {
  },

  methods: {
    toSignIn () {
      this.$store.dispatch("userSignIn", {
        email: this.email,
        password: this.password
      });
    },
    clear () {
      this.name = ''
      this.email = ''
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
