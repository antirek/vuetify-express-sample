<template>
  <div>
    profile edit
    <div v-if="profile">
      <h2>{{ profile.title }}</h2>
      <input v-model="profile.title" placeholder="title" />
      <input v-model="profile.data" placeholder="data" />
      <input type="button" value="send" @click="sendProfile()" />
    </div>
  </div>
</template>

<script>
import {Item} from 'utils/api';

export default {
  name: "UserProfile",
  data: function() {
    return {
      profile: null,
    };
  },
  watch: {
    $route: "getProfile"
  },
  created: function() {
    this.getProfile();
  },
  methods: {
    getProfile: function() {
      Item.get(this.$route.params.id)
        .then(res => {
          this.profile = res.data;
        });
    },
    sendProfile: function() {
      Item.update(this.$route.params.id, this.profile)
        .then(res => {
          this.$bus.emit('items.updatelist');
          this.$router.push('/items/' + this.profile._id + '/profile');
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
