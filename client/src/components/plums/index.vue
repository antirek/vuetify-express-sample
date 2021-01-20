<template lang="pug">
  v-row

    v-col(v-if='plums')
      v-container
        v-row(
          
        )      
          v-col(v-for='(plum, index) in plums' :key='plum.title')
            v-card(
               class="pa-2"
            )
              v-img(
                :src="plum.logoUrl"
                height="200px"
              )

              v-card-title {{ plum.title }}
        
              v-card-subtitle 1,000 miles of wonder

              v-card-actions
                v-btn(:to="{ path: '/plums/' + plum.short }") More
</template>

<script>
import {Item} from 'utils/api';

export default {
  name: 'itemsList',
  data: () => {
    return {
      plums: null
    }
  },
  created: function () {
    this.$bus.on('items.updatelist', this.getList);
    this.getList();
  },
  methods: {
    getList: function () {
      Item.query()
        .then(res => {
          this.plums = res.data;
        })
    }
  },
}
</script>