<template>
  <div id="reg">
    <div id="img"></div>
    <div id="text">
      <br><br><br>
      <p><el-input
      id="input"
        placeholder="邮箱"
        prefix-icon="el-icon-s-custom"
        v-model="eamil">
      </el-input></p>
      <br>
      <p></p>
      <el-button style="width:80px;" @click="eamil_verification">激活</el-button> &nbsp;
      <el-input v-model="yanzheng" placeholder="请输入验证码" style="width:165px;"></el-input>
      <br><br>
      <p>
        <el-input
        id="input"
        placeholder="密码"
        prefix-icon="el-icon-lock"
        v-model="password" show-password>
        </el-input>
      </p>
      <br><br>

      <el-button @click="regbutton" round>注册</el-button>
      <!-- <br>
      <br><br> -->
      
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import hello from './components/HelloWorld.vue'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
export default {
  data(){
    return {
      eamil:"",
      password:"",
      yanzheng:"",
    }
  },
  components:{
    hello
  },
  methods:{
    
    eamil_verification:function(){
      var _this = this;
      var email = _this.eamil;
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      var fd = new FormData();
      if(reg.test(email)){
        fd.append("eamil",_this.eamil);
        axios.post("api/eamil_verification",fd).then(function(res){
          if(res.data==1)
            _this.open2("验证码已发送");
          if (res.data==0)
            _this.open3("邮箱已注册");
        }).catch(function(error){
          _this.open4("服务器出错");
        });
      }else{
        _this.open4("邮箱格式不正确");
      }
    },
    regbutton:function(){
      var _this = this;
      var pass = _this.password;
      var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
      var fd = new FormData();
      fd.append("eamil",_this.eamil);
      fd.append("password",_this.password);
      fd.append("yanzheng",_this.yanzheng);
      if(reg.test(pass)){
        axios.post("api/reg",fd).then(function(res){
          if(res.data)
            _this.open2("注册成功");
          else _this.open4("已经注册");
        }).catch(function(){
            _this.open4("验证码错误");
        });
      }else{
        _this.open4("密码至少包含 数字和英文，长度8-20");
      }
      
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
   #reg {
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
