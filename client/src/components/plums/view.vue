<template lang="pug">
  div
    v-card.pa-2
      v-img(
        :src="plum.logoUrl"
        height="200px"
      )
      v-card-title {{ plum.title }}
      v-card-subtitle 1,000 miles of wonder

      v-tabs(
        fixed-tabs 
        background-color='indigo' 
        dark)
        v-tab
          | Info
        v-tab
          | Chat

        v-tab-item
          v-card
            v-card-text
              p sfddf
        v-tab-item
          v-card
            v-card-text
              p sdfdgfdg

</template>

<script>
import {Item} from 'utils/api';

export default {
  name: "PlumView",
  data: function() {
    return {
      plum: null,
    };
  },
  watch: {
    $route: "getPlum",
  },
  created: function() {
    this.getPlum();
  },
  methods: {
    getPlum: function() {
      Item.getByShort(this.$route.params.id)
        .then(res => {
          this.plum = res.data;
        });
    }
  }
};
</script>