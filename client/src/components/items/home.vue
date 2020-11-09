<template>
  <div>home
    {{ $route.params.id}}
    <br/>
    <router-link :to="{path:'/items/' + $route.params.id + '/profile'}">view </router-link> | 
    <router-link :to="{path:'/items/' + $route.params.id + '/edit'}">edit </router-link> | 
    <a href="#" v-on:click="drop">delete </a>
  </div>
</template>

<script>
import {Item} from 'utils/api';

export default {
  name: "UserHome",
  methods: {
    drop: function () {
      Item.delete(this.$route.params.id)
        .then(res => {
          this.$bus.emit('items.updatelist');
          this.$router.push('/items/');
        })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
