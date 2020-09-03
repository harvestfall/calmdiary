<template>
  <div id="diarymax">
    
    <headernav></headernav>
    <hr>
    <img :src="maxuserimg" alt="" id="diarymax_img1">
    <div id="diary">
      <userloveimg id="userloveimg"></userloveimg>
      <p id="tttt">Title</p><div id="title1">{{ title }}</div>
      <p id="tttt">Text</p><div id="text1">{{ text }}</div>
      <div id="icon1" v-if="!falg" @click="love()"><p id="peoples">{{ peoples }}</p></div>
      <div id="icon2" v-if="falg" @click="notlove()"><p id="peoples">{{ peoples }}</p></div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import headernav from './components/HeaderNav'
import userloveimg from './components/userimg'
export default {
  data(){
    return {
      maxuserimg:"",
      maxusereamil:"",
      maxuserdiaryurl:"",
      text:"",
      title:"",
      peoples:0,
      falg:false
    }
  },
  components:{
    headernav,
    userloveimg
  },
  methods:{
    love:function(){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("maxusereamil",this.maxusereamil);
      fd.append("maxuserdiaryurl",this.maxuserdiaryurl);
      axios.post("/api/lovediary",fd).then(function(res){
          _this.falg=true;
          _this.peoples = _this.peoples+1;
      }).catch(function(error){
        console.log(error);
      });
    },
    notlove:function(){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("maxusereamil",this.maxusereamil);
      fd.append("maxuserdiaryurl",this.maxuserdiaryurl);
      axios.post("/api/notlovediary",fd).then(function(res){
          _this.falg=false;
          _this.peoples = _this.peoples-1;
      }).catch(function(error){
        console.log(error);
      });
    }
  },
  created(){
   this.maxusereamil= sessionStorage.getItem("maxusereamil");
   this.maxuserimg= sessionStorage.getItem("maxuserimg");
   this.maxuserdiaryurl= sessionStorage.getItem("maxuserdiaryurl");
  },
  mounted(){
    document.getElementById("diarymax_img1").width=window.innerWidth;
    document.getElementById("diarymax_img1").height=window.innerHeight;

    var fd = new FormData();
      var _this = this;
      fd.append("maxusereamil",this.maxusereamil);
      fd.append("maxuserdiaryurl",this.maxuserdiaryurl);
      axios.post("/api/maxuserdiaryurl",fd).then(function(res){
          _this.text = res.data.text;
          _this.title = res.data.title;
          _this.peoples = res.data.peoples;
      }).catch(function(error){
        console.log(error);
      });


    var fd1 = new FormData();
      var _this = this;
      fd1.append("eamil",sessionStorage.getItem("eamil"));
      fd1.append("maxuserdiaryurl",this.maxuserdiaryurl);
      axios.post("/api/chaxunlovediary",fd1).then(function(res){
          // alert(_this.falg+"   "+res.data);
          _this.falg=res.data;
          Vue.set(_this.falg,res.data,_this.falg=res.data);
          
      }).catch(function(error){
        console.log(error);
      });

  }
}
</script>
<style lang="scss">
  #diarymax_img1{
    position: fixed;
    z-index: -1000;
  }
  #tttt{
    font-size: 20px;
  }
  #diary{
    position: relative;
    width: 80%;
    margin: 0 auto 0;
    margin-top: 80px;
    height:700px;
    background-color: white;
    opacity: 0.8;
  }
  #title1{
    width: 80%;
    height: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px ;
    margin-left: 30px;
    background-color: grey;
  }
  #text1{
    width: 80%;
    height:300px;
    margin-left: 30px;
    background-color: grey;
    padding-top: 20px;
    padding-left: 20px ;
  }
  #icon1{
    width: 63px;
    height: 63px;
    background-image: url("assets/img/sprites.png");
    background-position: -4px -26px;
    margin: 0 auto 0;
    cursor: pointer;
    text-align: center;
  }
  #icon2{
    width: 63px;
    height: 63px;
    background-image: url("assets/img/sprites.png");
    background-position: -105px -26px;
    margin: 0 auto 0;
    cursor: pointer;
    text-align: center;
  }
  #diary div{
    margin-top: 20px;
    margin-bottom: 20px;
  }
  #userloveimg{
    margin: 20px;
  }
  #peoples{
    line-height: 145px;
    color: gray;
  }
</style>
