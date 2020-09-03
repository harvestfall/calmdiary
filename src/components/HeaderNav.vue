<template>
  <div id="HeaderNav">
    <div class="index"><a href="index.html" id="a">首页</a></div>
    <div class="text">平静日记</div>
    <div id="login_reg" v-show="!login_temp">
      <div>
        <a href="login.html" target="true">
          <el-button type="primary" round id="button">登录</el-button>
        </a>
        <a id="gekai"> </a>
        <a href="reg.html" target="true">
          <el-button type="success" round id="button">注册</el-button>
        </a>
      </div>
    </div>
    <div id="user_div" v-show="login_temp">
      <el-col :span="12">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <div id="user_div">
              <img :src="userdata.img" id="img"> <p> 个人中心<i class="el-icon-arrow-down el-icon--right"></i></p>
            </div>
            
            <input id="eamil" v-show="false" v-model="userdata.eamil">
          </span>
          <el-dropdown-menu slot="dropdown">
            <a href="changuserdata.html"><el-dropdown-item>个人信息</el-dropdown-item></a>
            <a href="userlove.html"><el-dropdown-item>关注的人</el-dropdown-item></a>
            <a href="lovediary.html"><el-dropdown-item>收藏日记</el-dropdown-item></a>
            <a href="diary.html"><el-dropdown-item>日记本</el-dropdown-item></a>
            <a href="file.html"><el-dropdown-item>我的网盘</el-dropdown-item></a>
            <a href="BIM.html"><el-dropdown-item>二三联动</el-dropdown-item></a>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
  </div>
</template>
<script>
// import func from '../../vue-temp/vue-editor-bridge';
import axios from "axios"

export default {
  data(){
    return{
      login_temp:true,
      userdata:{
        eamil:"",
        img:"",
        imgbyte:[]
      }
    }
  },
  beforeMount(){
    
// btoa(); //字符串或二进制值转为Base64编码
// atob(); //Base64编码转为原始值
// alert(sessionStorage.getItem("eamil"));
    if(sessionStorage.getItem("eamil")==null){this.login_temp=false;}
    else {this.login_temp=true;}
    this.userdata.eamil=sessionStorage.getItem("eamil");
    var fd = new FormData();
    fd.append("eamil",sessionStorage.getItem("eamil"));
    var _this = this;
    axios.post("api/userimg",fd).then(function(res){
      _this.userdata.img= 'data:image/png;base64,'+res.data;
      // console.log(_this.userdata.img);
    }).catch(function(error){
        // alert("cw");
        console.log(error);
    });
  },
  updated(){
  },
  methods:{
    login:function(){
      
    }
  }

}
</script>
<style scoped>
  p{
    position: relative;
    display: inline-block;
    height:40px;
    top:-18px;
    font-size: 15px;;
  }
  a{
    text-decoration: none;
    color:white;
  }
  #a{
    color:#000;
  }
  #gekai{
    display: inline-block;
    width: 2px;
  }
  #HeaderNav{
    z-index: 999;
    /* margin-top: -80px; */
    position:fixed;
    width:100%;
    background-color:white;
    opacity: 0.8;
    height: 50px;
    top: 0px;
    left: 0px;
    padding-left: 5%;
    border-bottom: 2px #EBEBEB solid;
  }
  #button{
    width: 60px;
    padding: 8px;
    margin-top: -3px;
    border-radius: 20px;

    opacity: 0.8;
    cursor: pointer;
  }
  .index{
    margin-top: 10px;
    width: 100px;
  }
  .text{
    margin-top: 10px;
    width: 100px;
    margin-left: 30%;
  }
  #login_reg{
    margin-top: 10px;
    width: 200px;
    float: right;
    margin-right: 5%;
  }
  .index,.text{
    float: left;
  }
  #user_div{
    margin-top: 5px;
    width: 140px;
    height:40px;
    cursor: pointer;
    float:right;
    margin-right: 8%;

  }
  #img{
    width: 40px;
    height:40px;
    border-radius: 50%;
  }
  #img img{
    position: relative;
    left: -1px;
    top: -1px;
    width: 42px;
    height:42px;
    border-radius: 50%;
  }
</style>