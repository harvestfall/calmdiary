<template>
  <div id="login">
    <div id="img"></div>
    <div id="text">
      <br><br><br>
      <p><el-input
      id="input"
        placeholder="邮箱"
        prefix-icon="el-icon-s-custom"
        v-model="eamil">
      </el-input></p>
      
      <br><br>
      <p>
        <el-input
        id="input"
        placeholder="密码"
        prefix-icon="el-icon-lock"
        v-model="password" show-password>
        </el-input>
      </p>
      <br><br><br>
      <div id="wangji"><a href="">忘记密码?</a></div>
      <br><br>
      <el-button v-on:click="loginbutton" round >登录</el-button>
      <!-- <br>
      <br><br> -->
      
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import hello from './components/HelloWorld.vue'
export default {
  data(){
    return {
      eamil: "",
      password: ""
    }
  },
  components:{
    hello
  },
  methods:{
    get:function(){
      var _this = this;
      axios.get("/api/test_get").then(function(res){
        _this.msg=res.data;
      }).catch(function(error){});
    },
    loginbutton:function(){
      var _this = this;
      var fd = new FormData();
      fd.append("eamil",_this.eamil);
      fd.append("password",_this.password);
      axios.post("api/login",fd).then(function(res){
          alert(res.data);
          if(res.data==true){
            
            sessionStorage.setItem("eamil",_this.eamil);
            _this.open2("登录成功");
            window.location.href="index.html";
          }
          
        }).catch(function(){
            _this.open4("用户名或密码错误");
        });

    },



    //提示框
    //普通提示
    open1(text) {
        this.$message(text);
      },
    //成功提示
    open2(text) {
      this.$message({
        message: text,
        type: 'success'
      });
    },
    //警告提示
    open3(text) {
      this.$message({
        message: text,
        type: 'warning'
      });
    },
    //错误提示
    open4(text) {
      this.$message.error(text);
    }
  }
  
}
</script>
<style lang="scss">
   #login {
     width: 800px;
     height:325px;
     background-color: white;
     opacity: 1;
     border-radius: 20px;
     margin: 0 auto 0;
     margin-top: 100px;
     text-align: center;
       box-shadow: 1px 1px 5px #888888;
   }
   #img{
     width: 500px;
     height:325px;
     background-image: url('assets/img/login.jpg');
     float: left;
   }
   #text{
     width: 300px;
     height: 325px;
     float: left;
     text-align: center;
   }
   #wangji{
     float: right;
     width: 100px;
   }
   #input{
     width: 250px;
   }
   p{
     margin: 0px;
     padding: 0px;
     width: 250px;
     display: inline-block;
   }
   a{
     text-decoration:none;
     color: gray;
     font-size: 10px;
   }
   a:hover{
     text-decoration:revert;
     color:gray;
   }
</style>
