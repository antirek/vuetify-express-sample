<template>
  <div id="app" class="container">
    <navigation />
    <div>
      <center-container>
        <router-view />
      </center-container>
    </div>
  </div>
</template>

<script>
import Navigation from "components/navigation";
import { USER_REQUEST } from "actions/user";

export default {
  components: {
    Navigation
  },
  name: "app",
  created: function() {
    if (this.$store.getters.isAuthenticated) {
      this.$store.dispatch(USER_REQUEST);
    }
  }
};
</script>

<style>

</style>
