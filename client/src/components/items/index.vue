<template lang="pug">
  .row
    .col.col-md-4
      h3 Items List
      br
      router-link(:to="{path:'/items/new'}")  add 
      ul(v-if='items')
        li(v-for='(item, index) in items' :key='item.title')
          router-link(:to="{ path: '/items/' + item._id  + '/edit'}")
            | {{ index }} - {{ item.title }}
      br
    router-view.col.col-md-8
</template>

<script>
import {Item} from 'utils/api';

export default {
  name: 'itemsList',
  data: () => {
    return {
      items: null
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
          this.items = res.data;
        })
    }
  },
}
</script>