<template>
<div id="blog">
  <el-container id="container">
    <el-header id="header">{{blog.title}}
    </el-header>
    <el-container>
      <el-aside width="200px" id="aside">
        <div id="asideFloat">
          <div v-for="item in getAside" :key="item.text" @click="gotoText(item)">
            {{item.text}}
          </div>
        </div>
      </el-aside>
      <el-main id="main"  v-html="formatContent">

      </el-main>
    </el-container>
    <el-footer id="footer">
    </el-footer>
  </el-container>
</div>
</template>

<script>
import axios from "axios";
import hljs from 'highlight.js'
import 'highlight.js/styles/atelier-dune-dark.css' //样式文件
import Showdown from 'showdown';
import showdownToc from 'showdown-toc';
axios.defaults.baseURL='http://47.116.139.54:8081'
export default {
  name: "Blog",
  data(){
    return{
      blogID:0,
      blog: {
        content:null,
        id:0,
        likes:0,
        releaseTime:null,
        title:null,
        updateTime:null,
        visitCount:null
      },
      test:null,
      toc:null,
    }
  },
  computed:{
    formatContent(){
      const marked=require("marked")
      hljs.configure({
        tabReplace: '  ',
        classPrefix: 'hljs-',
        languages: ['CSS', 'HTML, XML', 'JavaScript', 'PHP', 'Python', 'Stylus', 'TypeScript', 'Markdown']
      })

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
      return marked(this.blog.content).replace(/<pre>/g, "<pre class='hljs'>");
    },
    getAside(){
      const toc = []
      const showdown = new Showdown.Converter({ extensions: [showdownToc({ toc })] });
      showdown.makeHtml(this.blog.content);
      return toc
    },
  },
  methods:{

    async getBlog(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      await axios({
        url:'/blog/getABlog/'+this.blogID,
      }).then(result=>{
        loading.close();
        this.blog=result.data
        console.log(this.blog)
      })
    },
    getBlogID(){
      this.blogID=this.$route.params.id
    },

    gotoText(item){
      document.querySelector(item.text).scrollIntoView(true);
    }
  },
  created() {
    this.getBlogID();
    this.getBlog();
  },
  components:{
  }

}



</script>

<style scoped>
#footer{
  height: 300px;
  background-color: beige;
}
#header{
  height: 200px;
  background-color: cornflowerblue;
  font-size: 40px;
  text-align: center;
}
#main{
  text-align: left;
}
#aside{
  background-color: #EBEBEB;
  text-align: left;
  font-size: 15px;
}
#blog{
  height: 100vh;
}
#container{
  height: 100vh;
  text-align: center;
  font-size: 25px;
  font-family: "Times New Roman", Times, serif;
}
#asideFloat{
}


</style>