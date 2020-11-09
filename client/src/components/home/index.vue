/** * Created by vouill on 11/13/17. */

<template>
  <div>
    <loading v-if="loading" />
    <div v-if="isAuthenticated">
      <h4>home, isAuthenticated</h4>
    </div>
    <div v-if="!isAuthenticated && authStatus !== 'loading'">
      <h1>Welcome to DogeBook !</h1>
      <p>
        When meeting new doge friends is harder than ever, Dogebook closes the
        gap between all paws in the world
      </p>      
    </div>
  </div>
</template>

<style>
.home {
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>

<script>

import { mapGetters } from "vuex";

export default {
  name: "home",
  computed: {
    ...mapGetters(["isAuthenticated", "authStatus"]),
    loading: function() {
      return this.authStatus === "loading" && !this.isAuthenticated;
    }
  },
};
</script>
