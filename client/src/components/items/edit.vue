<template lang="pug">
  div
    | item edit
    div(v-if='profile')
      h2 {{ profile.title }}
      v-text-field(
        label="Title"
        hide-details="auto"
        v-model='profile.title')
      v-text-field(
        label="Data"
        hide-details="auto"
        v-model='profile.data')
      v-text-field(
        label="logoUrl"
        hide-details="auto"
        v-model='profile.logoUrl')
      v-text-field(
        label="short"
        hide-details="auto"
        v-model='profile.short')
      br
      v-btn(
        block
        @click='sendProfile()') Save
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
