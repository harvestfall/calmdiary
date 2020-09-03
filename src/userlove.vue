<template>
  <div id="userlove">
    <headernav></headernav>
    <hr>
    <div id="banner_img"></div>
    <div id="show">
      <div id="user" v-for="(item,index) in userlove" :key="index">
        <div id="div_1">
          <div id="userloveimg">
            <img :src="item.img" alt="" id="userloveimgimg">
            <div id="li1">{{item.name}}</div>
          </div>
          <div id="button">
            <el-tooltip class="item" effect="dark" content="关注该用户" placement="top">
              <el-button type="danger" v-if="!falg" @click="Concern(item.eamil)">关注</el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="不再关注该用户" placement="top">
              <el-button v-if="falg" @click="notConcern(item.eamil)">已关注</el-button>
            </el-tooltip>
          </div>
        </div>
        <div id="introduce">
            {{ item.introduce }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import headernav from './components/HeaderNav'
export default {
  data(){
    return {
      userlove:[{eamil:"aaaa",introduce:"bbbb",name:"cccc",img:""},{eamil:"aaaa",introduce:"bbbb",name:"cccc",img:""}],
      falg:true
    }
  },
  components:{
    headernav
  },
  mounted(){
    var fd = new FormData();
    var _this = this;
    fd.append("eamil",sessionStorage.getItem("eamil"));
    axios.post("/api/userlove_userdata",fd).then(function(res){
        _this.userlove = res.data;
    }).catch(function(error){
      console.log(error);
    });

  },
  methods:{
    Concern:function(loveeamil){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("usereamil",loveeamil);
      
      axios.post("/api/adduserlove",fd).then(function(){
          _this.falg=true;
      }).catch(function(error){
        console.log(error);
      });
    },
    notConcern:function(loveeamil){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("usereamil",loveeamil);
      
      axios.post("/api/deluserlove",fd).then(function(){
          _this.falg=false;
      }).catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>
<style lang="scss">
  #banner_img{
    position: relative;
    top:80px;
    width: 80%;
    height: 170px;
    margin: 0 auto 0;
    background-color: red;
    background-image: url('./assets/img/112154556254985899489.png');
    background-size: 100% 100%;
    margin-bottom: 20px;
  }
  #show{
    position: relative;
    width: 80%;
    top: 80px;
    margin: 0 auto 0;
    opacity: 0.8;
    background-color: white;
  }
  #div_1{
    width:100%;
    height:65px;
  }
  #user{
    width: 100%;
    height:80px;
    padding-left: 40px;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-right: 40px;
  }
  #button{
    float: right;
    width:40%;
    padding: 10px;
  }
  #userloveimg{
    width:40%;
    height:65px;
    float: left;
    cursor: pointer;
  }
  #introduce{
    width:80%;
    text-decoration:underline;
    margin: 0 auto 0;
    color: gray;
  }
  #userloveimgimg{
    width: 65px;
    height:65px;
    border-radius: 50%;
  }
  #li1{
    color: gray;
    position: relative;
    left: 90px;
    top:-50px;
    font-size: 20px;
    border-bottom: 2px solid gray;
    width:130px;
  }
</style>
