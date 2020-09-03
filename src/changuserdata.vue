<template>
  <div id="changuserdata">
    <headernav></headernav>

    <div id="changuserdata_div">
      <ul>
        <li><i class="el-icon-user"></i> 用户名：   {{ userdata.name }}  <el-button id="button_el" @click="open">修改</el-button></li>
        <li><i class="el-icon-user-solid"></i> 邮箱：     {{ userdata.eamil }}  </li> 
        <li style="height:100px;line-height: 100px;"><i class="el-icon-picture"></i> 头像：     
          <img :src="userdata.img" alt="" id="userdata_img">  
          <a href="javascript:;" class="file">修改
                <input type="file" name="" id="upload" ref="upload" @change="uploadFile()">
          </a>
        </li>
        <li><i class="el-icon-sunny"></i> 注册日期： {{ userdata.data }}  </li> 
        <li style="height:100px;"><i class="el-icon-watermelon"></i> 个性签名： {{ userdata.introduce }}  <el-button id="button_el"  @click="open2">修改</el-button></li>
        <li><i class="el-icon-sugar"></i> 余额：      {{ userdata.money }}  </li>
      </ul>
    </div>
  </div>
</template>
<script>
/* eslint-disable */

import headernav from './components/HeaderNav'
import Vue from 'vue'
export default {
  data(){
    return {
      userdata:{}
    }
  },
  components:{
    headernav
  },
  created(){
    var fd = new FormData();
    var _this = this;
    fd.append("eamil",sessionStorage.getItem("eamil"));
    axios.post("api/userdata",fd).then(function(res){
        _this.userdata=res.data;
    }).catch(function(error){
        console.log("api/userdata"+error);
    });
  },
  methods:{
    uploadFile(){
      var file = document.getElementById('upload').files[0];
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("file",file);
      axios.post("api/update_user_img",fd).then(function(res){
          _this.img=res.data;
          window.location.href="changuserdata.html";
      }).catch(function(error){
          console.log("api/diary_books"+error);
      });
    },
    updatename:function(name){
      var _this = this;
      var fd = new FormData();
      fd.append("eamil",sessionStorage.getItem('eamil'));
      fd.append("name",name);
      axios.post("api/updatename",fd).then(function(){
        _this.userdata.name=name;
        Vue.set(_this.name,name,_this.name=name);
        return true;
      }).catch(function(error){
        console.log("api/updatename"+error);
        return false;
      });
      return true;
    },

    updateintroduce:function(introduce){
      var _this = this;
      var fd = new FormData();
      fd.append("eamil",sessionStorage.getItem('eamil'));
      fd.append("introduce",introduce);
      axios.post("api/updateintroduce",fd).then(function(){
        _this.userdata.introduce=introduce;
        return true;
      }).catch(function(error){
        console.log("api/updateintroduce"+error);
        return false;
      });
      return true;
    },
    open() {
        this.$prompt('输入用户名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({ value }) => {
          if(value.length>20){
            this.$message({
            type: 'info',
            message: '用户名要在0-20之间'
          });
          }else{
            if(this.updatename(value)==true){
              this.$message({
              type: 'success',
              message: '修改成功: ' + value
            });
            }else{
              this.$message({
              type: 'info',
              message:'服务器出错'
            });
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    },
    open2() {
        this.$prompt('输入个性签名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({ value }) => {
          if(value.length>600){
            this.$message({
            type: 'info',
            message: '个性签名要在0-600之间'
          });
          }else{
            if(this.updateintroduce(value)==true){
              this.$message({
              type: 'success',
              message: '修改成功: ' + value
            });
            }else{
              this.$message({
              type: 'info',
              message:'服务器出错'
            });
            }
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    }



  }

}
</script>
<style lang="scss">
  #changuserdata_div{
    width: 80%;
    margin: 0 auto 0;
    position: relative;
    top: 80px;
  }
  #span1{
    position: relative;
    width:200px;
    margin-left: 0px;
    display: inline-block;
    margin-right: 10px;
  }
  #changuserdata_div ul{
    text-decoration: none;
  }
  #changuserdata_div ul li{
    width: 70%;
    text-decoration: none;
    display: inline-block;
    height:65px;
    line-height: 65px;
  }
  #button_el{
    float: right;
  }
  #userdata_img{
    width: 100px;
    height:100px;
    
  }



  /*上传文件美化 */
  .file {
      position: relative;
      display: inline-block;
      background: white;
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      padding: 4px 20px;
      overflow: hidden;
      color: #606266;
      text-decoration: none;
      text-indent: 0;
      line-height: 30px;
      top: 10px;
      margin-left: 60px;
      float: right;
      font-size: 14px;
  }
  
  .file #upload {
      position: absolute;
      font-size: 10px;
      right: 0;
      top: 0;
      opacity: 0;
      
      cursor: pointer;
  }
  .file:hover {
      background: #AADFFD;
      border-color: #78C3F3;
      color: #004974;
      text-decoration: none;
  }
</style>
