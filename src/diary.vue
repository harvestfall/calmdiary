<template>
  <div id="diary">
    <headernav></headernav>
    <img id="backimg" :src="img" alt="">
    <h1>日记本</h1>
    
    <a href="lookdiary.html">
      <div id="diary_books" v-for="(item,index) in diary_books" v-bind:key="index" @click="diary_book(index)">
        <div id="book_name">{{ item }}</div>
      </div>
    </a>
    <el-tooltip class="item" effect="dark" content="创建新的日记本" placement="top" style="opcity:0.7;">
      <el-button id="add_diary" @click="open">
        <div id="add_diary">
              <div  id="addimg" slot="reference"></div>
            </div>
      </el-button>
    </el-tooltip>
    
  </div>
</template>
<script>
import axios from "axios"
import headernav from "./components/HeaderNav"
export default {
  data(){
    return {
      diary_books:["a","b"],
      img:""
    }
  },
  created(){
    //查询有几个日记本
    var fd = new FormData();
    fd.append("eamil",sessionStorage.getItem("eamil"));
    var _this = this;
    axios.post("api/diary_books",fd).then(function(res){
      _this.diary_books=res.data;
    }).catch(function(error){
      
        console.log("api/diary_books"+error);
    });
  },
  beforeMount(){
    //得到用户头像
    var fd = new FormData();
    fd.append("eamil",sessionStorage.getItem("eamil"));
    var _this = this;
    axios.post("api/userimg",fd).then(function(res){
      _this.img= 'data:image/png;base64,'+res.data;
      // console.log(_this.userdata.img);
    }).catch(function(){
        console.log("api/userimg错误");
    });
  },
  methods:{
    //增加日记本
    add_diary_book:function(diary_book_name){
      var fd = new FormData();
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("diary_book_name",diary_book_name);
      // var _this = this;
      axios.post("api/add_diary_book",fd).then(function(){
      }).catch(function(){
          return false;
      });
      return true;
    },
    //页面参数的传递
    diary_book:function(index){
      console.log(this.diary_books[index]);
      sessionStorage.setItem("diary_book_name",this.diary_books[index]);
    },


    //el-ment
    //新建日记本的函数
    open() {
        this.$prompt('请输入日记本名', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({ value }) => {
          if(value.length<4 || value.length>8){
            this.$message({
            type: 'info',
            message: '日记本名字要在4-8之间'
          });
          }else{
            if(this.add_diary_book(value)==true){
              this.$message({
              type: 'success',
              message: '成功新建日记本: ' + value
            });
            }else{
              this.$message({
              type: 'info',
              message: '新建日记本失败: '
            });
            }
          }
          





        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建'
          });       
        });
    }
  },
  components:{
    headernav,
  },
}
</script>
<style scoped>
  #diary{
    width: 80%;
    margin: 0 auto 0;
    margin-top: 100px;
    opacity: 0.8;
  }
  #diary_books{
    width: 240px;
    height: 320px;
    /* border: black 1px solid; */
    float: left;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 25px;
    margin-bottom: 25px;
    background-image: url("assets/img/diary1.png");
    background-size:298px,320px;
    cursor: pointer;
  }
  #add_diary{
    width: 240px;
    height: 320px;
    display: block;
    /* border: black 1px solid; */
    float: left;
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 25px;
    margin-bottom: 25px;
    cursor: pointer;
    opacity: 0.7;
  }
  #book_name{
    width: 180px ;
    position: relative;
    top: 295px;
    left:80px;
    /* border: black 1px solid; */
    font-size: 20px;
    color: gray;
  }
  #backimg{
    position: fixed;
    top: 0px;
    height: 0px;
    width: 80%;
    height: 100%;
    z-index: -444;
     opacity: 0.6;
  }
  #addimg{
    width: 200px;
    height: 200px;
    z-index: 100;
    background-image: url("assets/img/adddiary.png");
    background-size: 200px,200px;
    opacity: 0.7;
    margin-top: 40px;
    margin-left: -45px;;
    border: aliceblue 0px;
    
  }
  h1{
    display: block;
    margin: 0 auto 0;
    width: 100px;
    background-image: url('assets/img/text.png');
    /*文字样式*/
    font-weight: bold;
    
    font-family: monospace;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
</style>