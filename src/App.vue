<template>
  <div id="app">
    <headernav></headernav>
    <hr>
    <indexbody></indexbody>
    <div id="banner"></div>
  </div>
</template>
<script>
/* eslint-disable */

import headernav from './components/HeaderNav'
import indexbody from './components/index/indexbody'
export default {
  data(){
    return {
      msg:"app"
    }
  },
  components:{
    headernav,
    indexbody
  },
  methods:{
    get:function(){
      var _this = this;
      axios.get("/api/test_get").then(function(res){
        _this.msg=res.data;
      }).catch(function(error){});
    }
  }
}
</script>
<style lang="scss">
  #banner{
    width: 80%;
    background-image: url('./assets/img/banner.png');
    height:120px;
    margin: 0 auto 0;
    margin-top: 20px;
  }
</style>
