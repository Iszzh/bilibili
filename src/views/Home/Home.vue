<template>
  <div>
    <Top v-show="topShow"></Top>
    <Tabs></Tabs>
  </div>
</template>

<script>
import Top from '../Top/Top.vue'
import Tabs from '../Tabs/Tabs.vue'

import {mapGetters,mapActions} from 'vuex'
export default {
  computed:mapGetters([
    'topShow'
  ]),
  watch:{
    // $route 当路由发生变化的时候
    $route(to,from){
      if(to.path!=='/Home/Live'){
        this.$store.dispatch('showTop');
      }
    }
  },
  components:{
    Top,Tabs
  },
  data() {
    return {

    }
  }
}
</script>

<style>

</style>