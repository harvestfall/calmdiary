<template>
  <div id="lovediary">
    <headernav></headernav>
    <hr>
    <img id="backimg" :src="img" alt="">
    <div v-if="show" id="diary1"><h2>还没有点赞日记</h2></div>
    <div id="diary" v-for="(item,index) in lovediary" v-bind:key="index" :style="item.img" @click="lookdiary(index)">
      <h2 id="dairytitle"><i class="el-icon-document-remove"> </i> {{ item.title }}</h2>
      <hr>
      <div id="dairytext" style="position:relative;top:10px;"><i class="el-icon-tickets"> </i> {{ item.text }}</div>
    </div>
    <div id="witer"></div>
  </div>
</template>
<script>
/* eslint-disable */

import headernav from './components/HeaderNav'

export default {
  data(){
    return {
      img:"",
      show:false,
      lovediary:[],
      lovediaryeamil_url:[],
      maxuserimg:"",
      maxusereamil:"",
      maxuserdiaryurl:"",
    }
  },
  components:{
    headernav
  },
  created(){
    var fd = new FormData();
    fd.append("eamil",sessionStorage.getItem("eamil"));
    var _this = this;
    axios.post("api/userimg",fd).then(function(res){
      _this.img= 'data:image/png;base64,'+res.data;
      // console.log(_this.img);
    }).catch(function(){
        console.log("api/userimg-------------错误");
    });
  },
  mounted(){
    document.getElementById("backimg").width=window.innerWidth;
    document.getElementById("backimg").height=window.innerHeight;
    var _this = this;
    var fd = new FormData();
      fd.append("eamil",sessionStorage.getItem("eamil"));
    
      axios.post("api/chaxunlovediaryarray",fd).then(function(res){
        _this.lovediary = res.data;
        if(_this.lovediary.length==0)_this.show=true;
      }).catch(function(){
          console.log("api/chaxunlovediaryarray-------------错误");
      });
      var _this = this;
    var fd1 = new FormData();
      fd1.append("eamil",sessionStorage.getItem("eamil"));
    
      axios.post("api/lovediaryeamil_url",fd).then(function(res){
        _this.lovediaryeamil_url = res.data;
        if(_this.lovediaryeamil_url.length==0)_this.show=true;
      }).catch(function(){
          console.log("api/lovediaryeamil_url-------------错误");
      });
  },
  methods:{
    lookdiary:function(index){
      sessionStorage.setItem("maxusereamil",this.lovediaryeamil_url[index].loveusername);
      sessionStorage.setItem("maxuserimg",this.lovediary[index].img.backgroundImage.substring(4,this.lovediary[index].img.backgroundImage.length-1));
      sessionStorage.setItem("maxuserdiaryurl",this.lovediaryeamil_url[index].lovediaryurl);
      sessionStorage.setItem("usereamil",this.lovediaryeamil_url[index].loveusername);
      window.location="diarymax.html";
    }
  }
}
</script>
<style lang="scss">
  hr{
    width: 40%;
  }
  h2{
    cursor: pointer;
    display: block;
    position: relative;
    left:30px;
  }
  #diary{
    position: relative;
    padding: 20px;
    width: 60%;
    margin: 0 auto 0;
    margin-top: 100px;
    padding: 20px;
    opacity: 0.8;
    height:130px;
    border-bottom: 2px dashed #81BDFB;
    margin-bottom: 20px;
    border-left: #81BDFB 10px solid;
    cursor: pointer;
    /* background-color: rebeccapurple; */
    overflow:hidden;
    border-radius: 5px;
    background-color: #EBEBEB;
    opacity: 0.9;;
    background-size: 60%,40px;
  }
  #diary1{
    position: relative;
    padding: 20px;
    width: 60%;
    margin: 0 auto 0;
    margin-top: 100px;
    opacity: 0.8;
  }
  #backimg{
    position: fixed;
    opacity: 0.6;
    z-index: -444;
  }
</style>
