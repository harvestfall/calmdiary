<template>
  <div id="write">
    <headernav></headernav>
    <img id="backimg" :src="img" alt="">
    <h1>写日记</h1>
    <!-- <i class="el-icon-document-remove" id="i"></i> -->
    <div id="text">
      <el-input v-model="title" placeholder="Title"></el-input>
    </div>
    <!-- <i class="el-icon-tickets" id="i1"></i> -->
    <div id="text1">
      <el-input
        type="textarea"
        :rows="29"
        placeholder="日记正文"
        v-model="textarea">
      </el-input>
    </div>
    <p id="p">上传图片</p>
    <div id="img1">
      <el-upload
        action="api/insert_diary_img"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
    <div id="radio">
      <el-select v-model="value" placeholder="请选择日记本">
        <el-option
          v-for="item in diary_books"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <p id="time"></p>
      <el-radio v-model="radio" label="1">公开</el-radio>
      <el-radio v-model="radio" label="2">保密</el-radio>
      <el-button round @click="baocun">发布</el-button>
    </div>
    <div>
      
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import headernav from './components/HeaderNav'

export default {
  data(){
    return {
      img:"",
      /*el-ment*/
      dialogImageUrl: '',
      dialogVisible: false,
      radio:"1",
      diary_books:[{value:"a",label:"b"}],
      value:"",
      title:"",
      textarea:""
    }
  },
  beforeMount(){
     var fd = new FormData();
    var _this = this;
    fd.append("eamil",sessionStorage.getItem("eamil"));
    axios.post("api/diary_books_object",fd).then(function(res){
      _this.diary_books=res.data;
    }).catch(function(error){
        console.log("api/diary_books"+error);
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
  methods: {

    baocun:function(){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("within",_this.radio);
      fd.append("diary_book",_this.value);
      fd.append("title",_this.title);
      fd.append("text",_this.textarea);
      axios.post("api/insert_diary",fd).then(function(res){
        _this.open2("发布成功");
      }).catch(function(error){
        _this.open4("发布失败");
          console.log("api/diary_books"+error);
      });
    },










    /*el-ment*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
  },
  beforeMount(){
    //得到日记本的加工的对象
    var fd = new FormData();
      fd.append("eamil",sessionStorage.getItem("eamil"));
      var _this = this;
      axios.post("api/diary_books_object",fd).then(function(res){
        _this.diary_books=res.data;
      }).catch(function(error){
        
          console.log("api/diary_books"+error);
      });
  },
  components:{
    headernav
  }
  
}
</script>
<style lang="scss">

  #time{
    width: 20px;
    display: inline-block;
  }
  #write{
    width: 80%;
    margin: 0 auto 0;
    margin-top: 80px;
    opacity: 0.8;
  }
  #text{
    position: relative;
    // display: inline-block;
    width: 80%;
    margin-bottom: 40px;
    margin-top: 40px;
    margin-right: 18%;
    opacity: 0.8;
  }
  #text1{
    width: 80%;
    margin-bottom: 40px;
    // display: inline-block;
    margin-right: 1%;
    opacity: 0.8;
  }
  h1{
    color: rgb(131, 141, 118);
    display:block;
    padding-left: 35%;
  }
  #p{
    display: block;
    padding: 5px;
    color: rgb(131, 141, 118);
  }
  #img1{
    border: 1px solid rgb(211, 211, 211);
    padding: 5px;
    background-color: white;
    width: 80%;
    border-radius: 5px;;
    opacity: 0.8;
  }
  #radio{
    margin-top: 50px;
    background-color: white;
    width: 80%;
    margin-bottom: 300px;
    padding: 10px;
    border-radius: 5px;
    opacity: 0.8;
  }
  #backimg{
    position: fixed;
    width: 80%;
    height: 100%;
    opacity: 0.6;
    z-index: -444;
    
  }
</style>
