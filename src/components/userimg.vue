<template>
  <div id="userloveimg">
      <img :src="userimg" alt="" id="userimg">
    <span v-if="show">
      <el-tooltip class="item" effect="dark" content="关注该用户" placement="top">
        <el-button type="danger" v-if="!falg" @click="Concern()">关注</el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="不再关注该用户" placement="top">
        <el-button v-if="falg" @click="notConcern()">已关注</el-button>
      </el-tooltip>
    </span>
    <span id="span1" >{{ usereamil }}</span>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data(){
    return {
      usereamil:"",
      userimg:"",
      falg:false,
      show:true
    }
  },
  created(){
    if(sessionStorage.getItem("usereamil")==sessionStorage.getItem("eamil")){
      this.show=false;
    }
    var fd = new FormData();
    var _this = this;
    fd.append("usereamil",sessionStorage.getItem("usereamil"));
    axios.post("/api/usereamil",fd).then(function(res){
        _this.userimg = res.data;
    }).catch(function(error){
      console.log(error);
    });

    var fd1 = new FormData();
    // var _this = this;
    fd1.append("eamil",sessionStorage.getItem("eamil"));
    fd1.append("usereamil",sessionStorage.getItem("usereamil"));
    
    axios.post("/api/userlove",fd1).then(function(res){
        _this.falg = res.data;
    }).catch(function(error){
      console.log(error);
    });
  },
  methods :{
    Concern:function(){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("usereamil",sessionStorage.getItem("usereamil"));
      
      axios.post("/api/adduserlove",fd).then(function(){
          _this.falg=true;
      }).catch(function(error){
        console.log(error);
      });
    },
    notConcern:function(){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("usereamil",sessionStorage.getItem("usereamil"));
      
      axios.post("/api/deluserlove",fd).then(function(){
          _this.falg=false;
      }).catch(function(error){
        console.log(error);
      });
    }
  }
}
</script>
<style>
  #userloveimg{
    
    height: 40px;
    cursor: pointer;
    padding-left: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  #userimg{
    width: 40px;
    height:40px;
    border-radius: 50%;
    border: solid grey 1px;
    margin-right: 50px;
    float: left;
  }
  #span1{
    display: none;
  }

</style>
