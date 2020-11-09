<template>
  <div>
    profile add
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
  name: "UserNew",
  data: function() {
    return {
      profile: {
        title: '',
        data: '',
      },
    };
  },
  methods: {
    sendProfile: function() {
      Item.post(this.profile)
        .then(res => {
          this.$bus.emit('items.updatelist');
          this.$router.push('/items/' + res.data._id + '/profile');
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
