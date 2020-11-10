<template>
  <!-- App.vue -->
  <v-app id="inspire">
    <!-- Sizes your content based upon application components -->    
      <navigation />
      <!-- Provides the application the proper gutter -->
      <v-main class="grey lighten-3">
  
      <v-container >
        
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
      </v-main>
    <v-footer app>
      <!-- -->
    </v-footer>
  </v-app>
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