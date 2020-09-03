<template>
  <div id="indexbody">
    <div id="lunbo">
      <el-carousel :interval="5000" arrow="always">
        <el-carousel-item v-for="(item,index) in lunbo" :key="index">
          <h3    @click="diarymax(item.loveuserimg,item.loveusereamil,item.loveuserdiaryurl)"><img id="img" :src="item.loveuserimg" alt=""></h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div id="date">
      
      <div id="text">
        <img src="../../assets/img/diary.png" alt="" style="">
        <p style="font-size: 80px;" id="day">{{ date.day }}</p>
        <br>
        <p style="font-size:30px;" id="nian_yue">{{ date.nian_yue }}</p>
        <br>
        <p style="font-size:40px;" id="week">{{ date.week }}</p>

      </div>
      <div id="button">
        <a href="write.html" target="true"><el-button round style="width:60%;height:50px;"><i class="el-icon-edit"></i> 写日记</el-button></a>
      </div><br>
      <div id="show">
        <p><i class="el-icon-tickets"></i> 日记篇数:{{ userdiarychangdu }}</p><br>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
// eslint-disable-next-line
import axios from "axios"
import Vue from 'vue'
export default {
  data(){
    return {
      lunbo:[{loveuserimg:"",loveusereamil:"",loveuserdiaryurl:""},{loveuserimg:"",loveusereamil:"",loveuserdiaryurl:""},{loveuserimg:"",loveusereamil:"",loveuserdiaryurl:""}],
      //时间显示对象
      date:{nian_yue:"q",day:"q",week:"q"},
      userdiarychangdu:0,
      loveuserimg:""
    }
  },
  created(){
    var date = new Date();
    var year = date.getFullYear();
    var moth = date.getMonth()+1;
    // var day = date.getDate();
    var week = date.getDay();
    // var hour = date.getHours()+1;
    if(week==0){
      week=7;
    }
    // alert(this.date.day);
    this.date.day=date.getDate();
    if(week==1)this.date.week="Monday";
    if(week==2)this.date.week="Tuesday";
    if(week==3)this.date.week="Wednesday";
    if(week==4)this.date.week="Thursday";
    if(week==5)this.date.week="Friday";
    if(week==6)this.date.week="Saturday";
    if(week==7)this.date.week="Sunday";
    if(moth==1)this.date.nianyue="January"+" "+" "+year;
    if(moth==2)this.date.nian_yue="February"+" "+" "+year;
    if(moth==3)this.date.nian_yue="March"+" "+" "+year;
    if(moth==4)this.date.nian_yue="April"+" "+" "+year;
    if(moth==5)this.date.nian_yue="May"+" "+" "+year;
    if(moth==6)this.date.nian_yue="June"+" "+" "+year;
    if(moth==7)this.date.nian_yue="July"+" "+" "+year;
    if(moth==8)this.date.nian_yue="August"+" "+" "+year;
    if(moth==9)this.date.nian_yue="September"+" "+" "+year;
    if(moth==10)this.date.nian_yue="October"+" "+" "+year;
    if(moth==11)this.date.nian_yue="November"+" "+" "+year;
    if(moth==12)this.date.nian_yue="December"+" "+" "+year;
  },
  beforeMount(){
    sessionStorage.setItem("maxusereamil","");
    sessionStorage.setItem("maxuserimg","");
    sessionStorage.setItem("maxuserdiaryurl","");
    sessionStorage.setItem("usereamil","");
    var _this = this;
    axios.post("api/lovemaxdiary").then(function(res){
      // alert(res.data);
      // _this.lunbo=res.data;
      Vue.set(_this.lunbo,res.data,_this.lunbo=res.data);
    }).catch(function(error){
      console.log("api/lovemaxdiary"+error);
    });



    axios.post("api/userdiarychangdu").then(function(res){
      // alert(res.data);
      // _this.lunbo=res.data;
      _this.userdiarychangdu=res.data;
      // Vue.set(_this.userdiarychangdu,res.data,_this.userdiarychangdu=res.data);
    }).catch(function(error){
      console.log("api/userdiarychangdu"+error);
    });
    
  },
  methods:{
    diarymax(loveuserimg,loveusereamil,loveuserdiaryurl){
      // alert("aaaa");
      sessionStorage.setItem("maxusereamil",loveusereamil);
      sessionStorage.setItem("maxuserimg",loveuserimg);
      sessionStorage.setItem("maxuserdiaryurl",loveuserdiaryurl);
      sessionStorage.setItem("usereamil",loveusereamil);
      window.location="diarymax.html";
    }
  }
}
</script>
<style scoped>
  #indexbody{
    width: 80%;
    height: 400px;
    margin: 0 auto 0;
    margin-top: 80px;
    background-color: white;
    box-shadow: 1px 1px 5px #888888;
  }
  br{
    height:0px;
  }
  #img{
    width: 100%;
    height: 400px;
  }
  #indexbody #lunbo{
    width: 70%;
    float: left;
  }
  #indexbody #date{
    width: 30%;
    height: 400px;
    float: right;
  }
  #indexbody #date #text{
    /*背景样式*/
    position: relative;
    width: 100%;
    height: 200px;
    margin-top: 20px;
    text-align: center;
  }
  #indexbody #date #text p{
    display: inline;
    background-repeat: no-repeat;
    background-image: url('../../assets/img/text.png');
    /*文字样式*/
    font-weight: bold;
    
    font-family: monospace;
    /*图片文字样式*/
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  #indexbody #date #button {
    width: 100%;
    text-align: center;
  }
  #indexbody #date #show{
    text-align: center;
    font-size: 15px;
    opacity: 0.6;
  }

  /*------------------------------*/
  .el-carousel{
    height: 400px;
  } 
  .el-carousel__item{
    height: 400px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>