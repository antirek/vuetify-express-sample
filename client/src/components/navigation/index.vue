<template>
  <v-app-bar
      app
      flat
      color="blue accent-6"
    >
    <v-container class="py-0 fill-height">
      <v-avatar
        class="mr-5"
        size="48"
      >
        <img src="../../assets/logo.png" width="40px">
      </v-avatar>
      <v-toolbar-title class="mr-15">
        <strong>DOGEBOOK</strong>
      </v-toolbar-title>

      <v-btn to="/items" rounded style="text-decoration: none;">Catalog</v-btn>

      <v-btn to="/plums" rounded style="text-decoration: none;">Plums</v-btn>

      <v-spacer></v-spacer>

      <v-btn elevation="1" rounded to="/account" v-if="isProfileLoaded" class="ma-1" text>  
        <v-icon>mdi-account</v-icon>
        {{ name }}
      </v-btn>
      <v-btn v-if="isAuthenticated" @click="logout" rounded class="ma-1">
        <v-icon>mdi-account</v-icon>
        Logout
      </v-btn>
      <v-btn v-if="!isAuthenticated" to="login" rounded class="ma-1">
        <v-icon>mdi-account</v-icon>
        Login
      </v-btn>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import { AUTH_LOGOUT } from "actions/auth";

export default {
  name: "navigation",
  methods: {
    logout: function() {
      this.$store.dispatch(AUTH_LOGOUT)
        .then(() => {
          this.$router.push("/login");
        });
    }
  },
  computed: {
    ...mapGetters(["getProfile", "isAuthenticated", "isProfileLoaded"]),
    ...mapState({
      authLoading: state => state.auth.status === "loading",
      name: state => `${state.user.profile.title} ${state.user.profile.name}`
    })
  }
};
</script>