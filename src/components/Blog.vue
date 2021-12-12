<template>
  <div id="blog">
    <el-container id="container">
      <el-header id="header">{{blog.title}}</el-header>
      <el-container>
        <el-main id="main" class="markdown-body" style="text-align:left" v-html="formatContent"></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import "github-markdown-css/github-markdown-light.css";
import hljs from "highlight.js";
import 'highlight.js/styles/idea.css';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8081";
export default {
  name: "Blog",
  data() {
    return {
      blogID: 0,
      blog: {
        body: null,
        id: 0,
        likes: 0,
        created: null,
        title: null,
        updated: null,
        visitCount: null
      },
      test: null,
      toc: null
    };
  },
  computed: {
    formatContent() {
      const marked = require("marked");
      marked.setOptions({
        renderer: new marked.Renderer(),
        pedantic: false,
        gfm: true,
        tables: true,
        breaks: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        xhtml: false,
        highlight: code => hljs.highlightAuto(code).value
      });
      console.log(this.blog.body);
      return marked(this.blog.body);
    }
  },
  methods: {
    async getBlog() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
      });
      await axios({
        url: "/blog/" + this.blogID
      }).then(result => {
        loading.close();
        // console.log(result);
        this.blog = result.data.blog;
        console.log(this.blog);
      });
    },
    getBlogID() {
      this.blogID = this.$route.params.id;
    },

    gotoText(item) {
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
  components: {}
};
</script>

<style scoped>
.markdown-body {
  box-sizing: border-box;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 45px;
}


#footer {
  height: 300px;
  background-color: rgb(251, 251, 251);
}
#header {
  height: 200px;
  background-color: rgb(255, 255, 255);
  font-size: 40px;
  text-align: center;
}
#main {
  text-align: left;
}
#blog {
  height: 100vh;
}
#container {
  height: 100vh;
  text-align: center;
  font-size: 14px;
  font-family: "Times New Roman", Times, serif;
}
#asideFloat {
}
::v-deep img {
  width: 50%;
  height: 50%;
}
</style>