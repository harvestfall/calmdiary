<template>
  <div id="userdata">
    <headernav></headernav>
    <img id="backimg" :src="img" alt="">
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
  #backimg{
    position: fixed;
    width: 80%;
    height: 100%;
    opacity: 0.6;
    z-index: -444;
    
  }
</style>
