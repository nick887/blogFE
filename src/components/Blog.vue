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
import { Remarkable } from 'remarkable';
import hljs from 'highlight.js'
var md = new Remarkable('full', {
  html:         false,        // Enable HTML tags in source
  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
  breaks:       false,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,         // autoconvert URL-like texts to links
  linkTarget:   '',           // set target to open link in

  // Enable some language-neutral replacements + quotes beautification
  typographer:  false,

  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
  quotes: '“”‘’',

  // Highlighter function. Should return escaped HTML,
  // or '' if input not changed
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
        // eslint-disable-next-line no-empty
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
      // eslint-disable-next-line no-empty
    } catch (err) {}

    return ''; // use external default escaping
  }
});
import axios from "axios";
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
      return md.render(this.blog.content);
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
  activated() {
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
  font-size: 14px;
  font-family: "Times New Roman", Times, serif;
}
#asideFloat{
}
::v-deep img{
  width: 50%;
  height: 50%;
}



</style>