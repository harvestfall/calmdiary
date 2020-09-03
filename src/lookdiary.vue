<template>
  <div id="lookdiary">
    <headernav></headernav>
    <img id="backimg" :src="img" alt="">
    <div v-if="show" id="diary1"><h2>该日记本还没日记</h2></div>
    <div id="diary" v-for="(item,index) in diary" v-bind:key="index" :style="item.img" @click="lookdiary(index)">
      <h2 id="dairytitle"><i class="el-icon-document-remove"> </i> {{ item.title }}</h2>
      <hr>
      <div id="dairytext" style="position:relative;top:10px;"><i class="el-icon-tickets"> </i> {{ item.text }}</div>
    </div>
    <div id="witer"></div>
  </div>
</template>
<script>
/* eslint-disable */
import axios from "axios"
import headernav from "./components/HeaderNav"

export default {
  data(){
    return {
      diary:[],
      show:false,
      img:""
    }
  },
  beforeMount(){
    var _this = this;
    var fd = new FormData();
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("diary_book_name",sessionStorage.getItem("diary_book_name"));
      // alert(sessionStorage.getItem("diary_book_name"));
      axios.post("api/look_diary_book",fd).then(function(res){
        _this.diary = res.data;
        if(_this.diary.length==0)_this.show=true;
      }).catch(function(){
          console.log("api/look_diary_book-------------错误");
      });
  },
  created(){
    var fd = new FormData();
    fd.append("eamil",sessionStorage.getItem("eamil"));
    var _this = this;
    axios.post("api/userimg",fd).then(function(res){
      _this.img= 'data:image/png;base64,'+res.data;
      // console.log(_this.userdata.img);
    }).catch(function(){
        console.log("api/userimg-------------错误");
    });
  },
  methods:{
    lookdiary:function(index){
      sessionStorage.setItem("maxusereamil",sessionStorage.getItem("eamil"));
      sessionStorage.setItem("maxuserimg",this.diary[index].img.backgroundImage.substring(4,this.diary[index].img.backgroundImage.length-1));
      sessionStorage.setItem("maxuserdiaryurl","C:\\userfile\\"+sessionStorage.getItem("eamil")+"\\diary\\"+sessionStorage.getItem("diary_book_name")+"\\text\\"+this.diary[index].title+".txt");
      sessionStorage.setItem("usereamil",sessionStorage.getItem("eamil"));
      window.location="diarymax.html";
    }
  },
  components:{
    headernav,
  },
  
}

</script>
<style>
  #lookdiary{
    width:80%;
    margin: 0 auto 0;
    opacity: 0.8;
  }
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
    width: 80%;
    height: 100%;
    opacity: 0.6;
    z-index: -444;
    margin-top: -100px;
  }
</style>

