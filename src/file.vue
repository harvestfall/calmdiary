<template>
  <div id="file">
    <headernav></headernav>
    <div id="show">
      <div id="tip_show">
        <span><i class="el-icon-back" style="cursor: pointer;" @click="shangmkdir()"></i></span><span>全部文件</span><span id="file_url">{{ file_url }}</span><span>
        
          <a href="javascript:;" class="file">上传文件
              <input type="file" name="" id="upload" ref="upload" @change="uploadFile()">
          </a>
          <a href="javascript:;" class="file">添加文件夹
              <input type="text" style="cursor: pointer;" name="" v-on:click="createmkdir()" >
          </a>
        </span>
        <i></i>
        
      </div>
      <div id="file_show">
        <div id="file_show_file" v-for="(item,index) in filedata" :key="index" @mouseenter="showf(index)" @mouseleave="showff(index)" @click="mkdir(item.name,item.type)">
          <img :src="img[index]" id="img1" style="width:20px;height:20px;dispaly:inline-block;margin-right:20px;">
          <span>{{ item.name }}</span>
          <div style="display: flex; z-index:10000; " id="icon">
            <transition name="el-fade-in-linear" >
              <div v-if="(item.type!='mkdir')" v-show="show[index]" @click="download(file_url,item.name)"  class="transition-box" style="margin-right: 15px;opcity:0.8;"><i class="el-icon-download"></i></div>
            </transition>
            <transition name="el-fade-in">
              <div v-show="show[index]" @click="deletefile(file_url,item.name,item.type)" class="transition-box" style="margin-right: 15px;opcity:0.8;"><i class="el-icon-delete"></i></div>
            </transition>
          </div>
        </div>
        
        <div id="progress">
          <el-progress style="width:100%;height:100%;" type="circle" :percentage="userfilesize" ></el-progress>
        </div>
      </div>
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
      show:[false,false],
      filedata:[{name:"aaaaa",type:"zip"},{name:"aaaaa",type:"zip"}],
      img:[],
      imgbase:[],
      file_url:"",
      userfilesize:0
    }
  },
  created(){
    this.imgbase[0]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAh0lEQVRIie3NsQnCQBiG4cfDAQKBA7ESdA4bG2ewFsGFnMAVrCwcROzEENxBG3u9QK6I99bf/z8MrdHzsl7hiPhl22KDM9TLUzJ0w+zH/bWO1SJJ+BQSEJh3QWBcxyr15pW4f2AXUpUOTXDIAcE0F6RABSpQgf4FajM494Atmh6RBvse/w+9Nxp5ElrktYKoAAAAAElFTkSuQmCC";
    this.imgbase[1]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAA4ImlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4KPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMTEgNzkuMTU4MzI1LCAyMDE1LzA5LzEwLTAxOjEwOjIwICAgICAgICAiPgogICA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPgogICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIgogICAgICAgICAgICB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgICAgICAgICAgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIgogICAgICAgICAgICB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIKICAgICAgICAgICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iCiAgICAgICAgICAgIHhtbG5zOmV4aWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vZXhpZi8xLjAvIj4KICAgICAgICAgPHhtcDpDcmVhdG9yVG9vbD5BZG9iZSBQaG90b3Nob3AgQ0MgMjAxNSAoTWFjaW50b3NoKTwveG1wOkNyZWF0b3JUb29sPgogICAgICAgICA8eG1wOkNyZWF0ZURhdGU+MjAxNi0wNS0yNFQxMToxMCswODowMDwveG1wOkNyZWF0ZURhdGU+CiAgICAgICAgIDx4bXA6TW9kaWZ5RGF0ZT4yMDE2LTA1LTI0VDExOjQ2OjUyKzA4OjAwPC94bXA6TW9kaWZ5RGF0ZT4KICAgICAgICAgPHhtcDpNZXRhZGF0YURhdGU+MjAxNi0wNS0yNFQxMTo0Njo1MiswODowMDwveG1wOk1ldGFkYXRhRGF0ZT4KICAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9wbmc8L2RjOmZvcm1hdD4KICAgICAgICAgPHBob3Rvc2hvcDpDb2xvck1vZGU+MzwvcGhvdG9zaG9wOkNvbG9yTW9kZT4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDplOTExY2Y4Ny1kMTA0LTRmM2YtYmFhNy02NjA2YTlkNmIwYTc8L3htcE1NOkluc3RhbmNlSUQ+CiAgICAgICAgIDx4bXBNTTpEb2N1bWVudElEPnhtcC5kaWQ6ZTkxMWNmODctZDEwNC00ZjNmLWJhYTctNjYwNmE5ZDZiMGE3PC94bXBNTTpEb2N1bWVudElEPgogICAgICAgICA8eG1wTU06T3JpZ2luYWxEb2N1bWVudElEPnhtcC5kaWQ6ZTkxMWNmODctZDEwNC00ZjNmLWJhYTctNjYwNmE5ZDZiMGE3PC94bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ+CiAgICAgICAgIDx4bXBNTTpIaXN0b3J5PgogICAgICAgICAgICA8cmRmOlNlcT4KICAgICAgICAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSJSZXNvdXJjZSI+CiAgICAgICAgICAgICAgICAgIDxzdEV2dDphY3Rpb24+Y3JlYXRlZDwvc3RFdnQ6YWN0aW9uPgogICAgICAgICAgICAgICAgICA8c3RFdnQ6aW5zdGFuY2VJRD54bXAuaWlkOmU5MTFjZjg3LWQxMDQtNGYzZi1iYWE3LTY2MDZhOWQ2YjBhNzwvc3RFdnQ6aW5zdGFuY2VJRD4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OndoZW4+MjAxNi0wNS0yNFQxMToxMCswODowMDwvc3RFdnQ6d2hlbj4KICAgICAgICAgICAgICAgICAgPHN0RXZ0OnNvZnR3YXJlQWdlbnQ+QWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCk8L3N0RXZ0OnNvZnR3YXJlQWdlbnQ+CiAgICAgICAgICAgICAgIDwvcmRmOmxpPgogICAgICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgIDwveG1wTU06SGlzdG9yeT4KICAgICAgICAgPHRpZmY6T3JpZW50YXRpb24+MTwvdGlmZjpPcmllbnRhdGlvbj4KICAgICAgICAgPHRpZmY6WFJlc29sdXRpb24+NzIwMDAwLzEwMDAwPC90aWZmOlhSZXNvbHV0aW9uPgogICAgICAgICA8dGlmZjpZUmVzb2x1dGlvbj43MjAwMDAvMTAwMDA8L3RpZmY6WVJlc29sdXRpb24+CiAgICAgICAgIDx0aWZmOlJlc29sdXRpb25Vbml0PjI8L3RpZmY6UmVzb2x1dGlvblVuaXQ+CiAgICAgICAgIDxleGlmOkNvbG9yU3BhY2U+NjU1MzU8L2V4aWY6Q29sb3JTcGFjZT4KICAgICAgICAgPGV4aWY6UGl4ZWxYRGltZW5zaW9uPjI0PC9leGlmOlBpeGVsWERpbWVuc2lvbj4KICAgICAgICAgPGV4aWY6UGl4ZWxZRGltZW5zaW9uPjI0PC9leGlmOlBpeGVsWURpbWVuc2lvbj4KICAgICAgPC9yZGY6RGVzY3JpcHRpb24+CiAgIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgI"
    +"CAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg"
    +"ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAg"
    +"ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgCjw/eHBhY2tldCBlbmQ9InciPz7H/N5jAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAE5SURBVHja7JRNTsJAGIafKSW6AqQtpVCRREL0Ah7Bhedw5R3EyDlMvIdH8AISCYkIglCMdq3tuIFoKCVNGaML39V88yXvM/POj5BScnN7dwJcAyVSqO6W28DF97lmZQcAbV5fpTWfqwVcrmosAA6bqwW04wAbKQjCxfB8GaIEMHv1YyFifsgSxTo+OhTKdrBOPw7QE61CCBquRdnIoQnBaObTHXpIKdUA9qsWdcf4eliOQRBKek+emogcMxeZq5j5zSLShKBZK1ExC+iZ6Dq2t7Ic7NncP04J10QVu4PmbomaXVxpDiCAml2k4VrpInISRlC1Cr97TWMBo5mfyGDovaU75O5gihDgGHmyeibSf/8IGL/49IZeOkAoJZ3+hE5/8re/in9AYsBYse/DMuAUeFZkPgDOFsXnABkcUrSPgJxdAAAAAElFTkSuQmCC";
    this.imgbase[2]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAXVBMVEUAAAD/d0P/o4D/d0P/d0P/o4D/d0P/d0P/////o4D//Pv/iVv/yrb/fkz/+PX/6N//zrv/x7H/vKP/n3r/kWb/hFT/9PD/8u3/7OX/4NT/zrz/tJj/qon/nXj/jmNpBOBWAAAAB3RSTlMA54JJ4YHpIHF8ZgAAAIFJREFUKM+9y0sWgjAQRNHGoFWJBBDBv+5/mYKG05Jk4Ig36EHfUyJmh0VbCRVYZmdBDHaTh2OQBIZZkOsPuNdtHs7kkIWWzXhvXQLoPfCi28dgp8+BrCLonevga4aJwpVkMw6+E4UHQ5+Jgj9Rq37g6ahdFKLWhAJp5QQmldKIvAGfwA8gkWyZZQAAAABJRU5ErkJggg==";
    this.imgbase[3]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAdVBMVEUAAACl0v9Nl/9Nl/9Nl/+l0v9Nl/9Nl/9Nl/////+l0v/z+P/3+//a6v/G3v+qzv+dxv9Ynv/8/f/M4f+v0f+Lu/+Btv92r/9wrP/f7P++2f+nzP+czP9kpv9UnP/7/f/u9f/l8P+71/+iyf+Uwf98s/9rqf/gBAVhAAAACHRSTlMAgknm4YHp5xhLqDUAAACbSURBVCjPtc3ZDoJAEETREbcqBmZhRwR3//8T1UQSeuDJxPvYJ51SKtpBtFXf1pDFoyCEeLUMx1FC6EfBUr/D4QLAnUrAn60ANkBKA1TsplDSwTPRgGU9BU+DipYN0kSOpxpF4umGzEjo+GxzpPmDdwk1b3TvJ8teArRmg4q6RQCGGhgyFiGUvALIs1qA6B+wxrzNB6L9/B4p9QK5uBLO0pzGKQAAAABJRU5ErkJggg==";
    this.imgbase[4]="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYBAMAAAASWSDLAAAAKlBMVEUAAABVx/d+zztVx/eI00qI00p+zztVx/f5X11+zzv9r0KI00r////xalyA481eAAAAB3RSTlMA5uZJ50pK5MP+KwAAAFtJREFUGNNjIBYYlpeXr1oFJISBHHEYpxDIKYdxyonndADBqlUgEsLpOXPmBIKzahU+Dqaeu0CwahWIBHJ2A8GqVSASyJkJBKtWAYnZeDmaMM4UICcJxlHFExwAL1NtZ9NgqI8AAAAASUVORK5CYII=";
  
  },
  updated(){
      // var fd = new FormData();
      // var _this = this;
      // fd.append("eamil",sessionStorage.getItem("eamil"));
      // axios.post("api/diary_books_object",fd).then(function(res){
      //   _this.diary_books=res.data;
      // }).catch(function(error){
      //     console.log("api/diary_books"+error);
      // });
  },
  beforeMount(){
    
    this.getuserfilesize();
      for(var i=0;i<100;i++)
        this.show[i]=false;
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("file_url",this.file_url);
      axios.post("api/file_url_files",fd).then(function(res){
        _this.filedata=res.data;
        // alert(res.data);
        for(var i=0;i<_this.filedata.length;i++){
          // _this.show[i].show=false;
          // alert(_this.filedata.length);
            if(_this.filedata[i].type=="mkdir")
              _this.img[i]=_this.imgbase[0];
            else if(_this.filedata[i].type=="jpg" || _this.filedata[i].type=="png" || _this.filedata[i].type=="gif")
              _this.img[i]=_this.imgbase[2];
            else if(_this.filedata[i].type=="word" || _this.filedata[i].type=="doxc")
              _this.img[i]=_this.imgbase[3];
            else if(_this.filedata[i].type=="zip")
              _this.img[i]=_this.imgbase[4];
            else _this.img[i]=_this.imgbase[1];
        }
      }).catch(function(error){
          console.log("api/file_url_files"+error);
      });
    
  },
  methods: {

    showf(index){
      
      this.show[index]=true;
      Vue.set(this.show, index, this.show[index]=true);
      console.log(this.show[index]+""+index);
    },
    showff(index){
      this.show[index]=false;
      Vue.set(this.show, index, this.show[index]=false);
    },
    aaaa(){
      alert("aaa");
    },
    getuserfilesize(){
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      axios.post("api/userfilesize",fd).then(function(res){
        
        setTimeout(function(){_this.userfilesize=res.data; }, 1000);
      }).catch(function(error){
          console.log("api/userfilesize"+error);
      });
    },
    download(url,name){
        var fd = new FormData();
        fd.append("eamil",sessionStorage.getItem("eamil"));
        fd.append("fileurl",url+"/"+name);
        fd.append("filename",name);
        axios.post("api/file_download",fd,{responseType: 'blob'}).then(function(res){
           const blob = new Blob([res.data]);
          const a = document.createElement("a");
          const url = window.URL.createObjectURL(blob);
          const filename = name;
          a.href = url;
          a.download = name;
          a.click();
          window.URL.revokeObjectURL(url);
        }).catch(function(error){
            console.log("api/file_download"+error);
        });
    },
    mkdir(url,type){
      // alert(type);
      if(type==="mkdir"){
        var fd = new FormData();
        var _this = this;
        _this.file_url=_this.file_url+"/"+url;
        fd.append("eamil",sessionStorage.getItem("eamil"));
        fd.append("file_url",this.file_url);
        axios.post("api/file_url_files",fd).then(function(res){
          _this.filedata=res.data;
          for(var i=0;i<_this.filedata.length;i++){ 
              if(_this.filedata[i].type=="mkdir")
                _this.img[i]=_this.imgbase[0];
              else if(_this.filedata[i].type=="jpg")
                _this.img[i]=_this.imgbase[2];
              else if(_this.filedata[i].type=="word")
                _this.img[i]=_this.imgbase[3];
              else if(_this.filedata[i].type=="zip")
                _this.img[i]=_this.imgbase[4];
              else _this.img[i]=_this.imgbase[1];
          }
          
        }).catch(function(error){
            console.log("api/file_url_files"+error);
        });
      }
    },
    createmkdir(){
      var _this = this;
      this.$prompt('输入此目录下新建文件夹的名称', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',

        }).then(({ value }) => {
          var fd = new FormData();

          fd.append("eamil",sessionStorage.getItem("eamil"));
          fd.append("mkdirurl",this.file_url);
          fd.append("mkdirname",value)
          axios.post("api/createmkdir",fd).then(function(res){
            if(res.data == true )
              _this.open2("创建成功");
            else _this.open4("创建失败");
          }).catch(function(error){
            console.log("api/createmkdir"+error);
          });
            
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消创建'
          });       
        });
    },
    shangmkdir(){
      var shangurl;
      var url=this.file_url;
      for(var i=url.length;i>=0;i--){
        if(url.charAt(i)=='/'){
          shangurl=url.substring(0,i);
          // alert(shangurl);
          break;
        }
      }
      this.file_url=shangurl;
      var fd = new FormData();
      var _this = this;
      
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("file_url",this.file_url);
      axios.post("api/file_url_files",fd).then(function(res){
        _this.filedata=res.data;
        for(var i=0;i<_this.filedata.length;i++){ 
            if(_this.filedata[i].type=="mkdir")
              _this.img[i]=_this.imgbase[0];
            else if(_this.filedata[i].type=="jpg")
              _this.img[i]=_this.imgbase[2];
            else if(_this.filedata[i].type=="word")
              _this.img[i]=_this.imgbase[3];
            else if(_this.filedata[i].type=="zip")
              _this.img[i]=_this.imgbase[4];
            else _this.img[i]=_this.imgbase[1];
        }
        
      }).catch(function(error){
          console.log("api/file_url_files"+error);
      });
    },
    uploadFile(){
      // console.log(document.getElementById('upload').files[0]);
      var file = document.getElementById('upload').files[0];
      var fd = new FormData();
      var _this = this;
      fd.append("eamil",sessionStorage.getItem("eamil"));
      fd.append("file_url",this.file_url);
      fd.append("file",file);
      console.log(file);
      fd.append("filename",file.name);
      axios.post("api/file_upload",fd).then(function(res){
          
        if(res.data==true){
            _this.open2("上传成功");
          }
      }).catch(function(error){
          console.log("api/diary_books"+error);
      });
    },
    deletefile(url,name,type){
      var _this=this;
      var fd = new FormData();
        fd.append("eamil",sessionStorage.getItem("eamil"));
        fd.append("fileurl",url);
        fd.append("filename",name);
        axios.post("api/deletefile",fd).then(function(res){
          if(res.data==true){
            _this.open2("删除成功");
           if(type=='mkdir'){
             _this.shangmkdir();
           }
          }
        }).catch(function(error){
            console.log("api/deletefile"+error);
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

  components:{
    headernav
  }
  
}
</script>
<style lang="scss">

  #show{
    width: 80%;
    margin: 0 auto 0;
    margin-top: 100px;
    position: relative;
    
  }
  #tip_show{
    width: 100%;
    padding-top:10px;
    padding-bottom:10px;
    height: 20px;
    position: relative;
    background-color: rgb(141, 187, 247);
    border-radius: 5px;
  }
  #tip_show span{
    color: #EBEBEB;
    position: relative;
    top:-14px;
    display: inline-block;
    margin-left:20px ;
    
  }
  #file_show{
    position: relative;
    width: 100%;
    height:600px;
    margin-top: 40px;
    background-color: white;
    border-radius: 5px;
  }
  #progress{
    top:100px;
    width: 12%;
    position:relative;
    float: right;
    box-shadow: 1px 1px 5px #888888;
    margin-right: 12%;
  }

  #file_show{
    overflow-x: auto;
    white-space: nowrap;
    overflow-y: hidden;
  }

  #file_show::-webkit-scrollbar {
    display: none;    /* 隐藏滚动条 */
  }

  #file_show_file{
    position: relative;
    width: 100%;
    height:20px;
    padding: 10px;
    margin-top: 4px;
    cursor: pointer;
    color:gray;
    border-bottom: 1px solid #ebebeb;
  }
  #icon{
    position: relative;
    width: 15%;
    height: 10px;
    float: right;
    margin-right: 20%;
  }




/*上传文件美化 */
  .file {
      position: relative;
      display: inline-block;
      background: #D0EEFF;
      border: 1px solid #99D3F5;
      border-radius: 4px;
      padding: 4px 12px;
      overflow: hidden;
      color: #1E88C7;
      text-decoration: none;
      text-indent: 0;
      line-height: 20px;
      top: 10px;
      margin-left: 40px;
  }
  
  .file input {
      position: absolute;
      font-size: 100px;
      right: 0;
      top: 0;
      opacity: 0;
  }
  .file:hover {
      background: #AADFFD;
      border-color: #78C3F3;
      color: #004974;
      text-decoration: none;
  }
</style>
