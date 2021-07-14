<template>
<div id="index">
  <div id="showPic" :style="{backgroundImage:'url('+imgURL+')'}">
    <div id="saying">
      <div>{{this.todayPoem.daySentence}}</div>
      <div id="author">{{this.todayPoem.dynasty}}   {{this.todayPoem.author}}</div>
    </div>
  </div>
  本网站已运行:{{this.timeMsg}}
  <div id="pageHelperUp" >
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="this.page.pageNum"
        :page-size="this.page.pageSize"
        :total="this.page.total"
        @prev-click="Prev"
        @next-click="Next"
        @current-change="currentChange"
        >
    </el-pagination>
  </div>
  <div id="blogList" >
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span id="BlogTableTitle">博文列表</span>
      </div>
      <div v-for="item in this.blogList" :key="item.id" class="text item" id="BlogTableItem">
         <div class="BlogTitle">
           <router-link :to="'/blog/'+item.id">{{item.title}}</router-link>
         </div>
         <div class="configbar">
           <i class="el-icon-date"/> 发表于{{new Date(item.releaseTime).format("yyyy-MM-dd hh:mm:ss")}}   |   <i class="el-icon-s-flag"/>阅读{{item.visitCount}}   |   <i class="el-icon-date"/>上次更新:{{new Date(item.updateTime).format("yyyy-MM-dd hh:mm:ss")}}   |
           <i class="el-icon-medal"/>喜欢:{{item.likes}}
         </div>
        <div class="BlogContent" v-html="contentFormatSub(item)" >

        </div>
        <el-divider></el-divider>
      </div>
    </el-card>
  </div>
  <div id="pageHelperDown">
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="this.page.pageNum"
        :page-size="this.page.pageSize"
        :total="this.page.total"
        @prev-click="Prev"
        @next-click="Next"
        @current-change="currentChange"
    >
    </el-pagination>
  </div>
</div>
</template>

<script>
import axios from "axios";
import hljs from "highlight.js";
axios.defaults.baseURL='http://47.116.139.54:8081'
export default {
  name: "Home",
  created() {
    this.randomIngURL();
  },
  mounted() {
    this.setDayPoem();
    this.getBlogList();
    this.getCreateDate();
    let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date(); // 修改数据date
      this.getDateDiff();
    }, 1000)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
    }
  },
  components:{
  },
  data(){
    return{
      imgURL : null,
      todayPoem:{
        content : [],
        author : '',
        dynasty: '',
        daySentence:''
      },
      page:{
        pageNum:1,
        pageSize:5,
        total :10
      },
      blogList:[
      ],
      date:new Date(),
      createDate:new Date(),
      timeMsg:null,
    }
  },
  computed:{
  },
  methods:{
    getDateDiff(){
      const stime = new Date(this.createDate);
      const etime = this.date;
      const usedTime = etime - stime
// 计算相差的天数
      const days = Math.floor(usedTime / (24 * 3600 * 1000))
// 计算天数后剩余的毫秒数
      const leave1 = usedTime % (24 * 3600 * 1000)
// 计算出小时数
      const hours = Math.floor(leave1 / (3600 * 1000))
// 计算小时数后剩余的毫秒数
      const leave2 = leave1 % (3600 * 1000)
// 计算相差分钟数
      const minutes = Math.floor(leave2 / (60 * 1000))
// 计算分钟数后剩余的毫秒数
      const leave3 = leave2 % (60 * 1000)
// 计算相差秒数
      const second = Math.floor(leave3 / 1000)
      const time = days + '天' + hours + '时' + minutes + '分' + second + '秒'
      this.timeMsg=time;
    },
    randomNum(minNum,maxNum){
      return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
    },
    randomIngURL(){
      const id=this.randomNum(1,5);
      this.imgURL='https://img.nickxiao.icu/fushihui'+id+'.jpg'
    },
    setDayPoem(){
      const jinrishici = require('jinrishici');
      jinrishici.load(result => {
        console.log(result)
        this.todayPoem.content=result.data.origin.content;
        this.todayPoem.author=result.data.origin.author;
        this.todayPoem.dynasty=result.data.origin.dynasty;
        this.todayPoem.daySentence=result.data.content;
      });
    },
    async getBlogList(){
      const loading = this.$loading({
        lock: true,
        text: '拼命加载中呜呜呜',
        spinner: 'el-icon-loading',
        target:document.querySelector("#blogList"),
      });
      await axios({
        url:'/blog/blogPage/'+this.page.pageNum+'/'+this.page.pageSize
      }).then(result=>{
        this.blogList=result.data.data;
        this.page.total=result.data.total;
        loading.close();
      })
    },
    Prev(){
      this.page.pageNum--;
      this.getBlogList();
    },
    Next(){
      this.page.pageNum++;
      this.getBlogList();
    },
    currentChange(val){
      this.page.pageNum=val;
      this.getBlogList();
    },
    contentFormatSub(item){
      const marked=require("marked")
      marked.setOptions({
        renderer:new marked.Renderer(),
        pedantic: false,
        gfm: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: (code) => hljs.highlightAuto(code).value,
      })
      return marked(item.content).substring(0,300);
    },
     async getCreateDate() {
       await axios({
        url:'/time/timeRecord'
      }).then(result=>{
        this.createDate=result.data.createTime;
        this.getDateDiff();
      })
    }
  }
}
Date.prototype.format = function(fmt) {
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S" : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt)) {
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  }
  for(var k in o) {
    if(new RegExp("("+ k +")").test(fmt)){
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    }
  }
  return fmt;
}
</script>

<style scoped>
#showPic{
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh);
}
#saying{
  width:800px;/**宽度**/
  height:100px;/**高度**/
  position:absolute;/**绝对定位**/
  left:38%;/**左边50%**/
  top:50%;/**顶部50%**/
  margin-top:-50px;/**上移-50%**/
  margin-left:-100px;/**左移-50%**/
  font-size: 40px;
  font-family: "Times New Roman", Times, serif;
  color: white;
  text-align: center;
}
#author{
  font-size: 20px;
  text-align: right;
}
#pageHelperUp{
  text-align: right;
}
#pageHelperDown{
  text-align: right;
}
#blogList{
  margin: 0 auto;
  width: 50%;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
#BlogTableTitle{
  font-size: 40px;
  font-family: "Times New Roman", Times, serif;
}
#BlogTableItem{
  font-size: 16px;

  font-family: "Times New Roman", Times, serif;
}
.configbar{
  font-size: 15px;
  text-align: left;
}
.BlogTitle{
  font-size: 35px;
  text-align: left;
  color: black;
}
.BlogContent{
  font-size: 8px;
  text-align: left;
}
a{
  color:black;
  text-decoration:none
}
.router-link-active{
  color: darkgray;
}

::v-deep img{
  width: 50%;
  height: 50%;
}
</style>