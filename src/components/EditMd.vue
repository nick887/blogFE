<template>
<div>
  <div id="abc">
    <div id="title">
      标题:<el-input v-model="blog.title" placeholder="必须输入"></el-input>
    </div>
    <div id="submit">
      <el-button type="success" plain @click="submitBlog">提交</el-button>
    </div>
  </div>
   

</div>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'

import axios from "axios";
axios.defaults.baseURL='http://localhost:8081'
export default {
  name: "EditMd",
  data(){
    return{
      value:'',
      blog:{
        title:null,
        topic:1,
        body:null,
        id:0,
      },
    }
  },
  components:
  {
    MarkdownPro
  }
  ,created() {
    this.initBlog();
  },
  methods:{
    async submitBlog(){
      this.blog.body=this.value;
      console.log(this.blog);
      if(this.blog.id!==0)
      {
        await axios({
          url:'/blog/update',
          method:'post',
          data:this.blog,
          headers: {'Authorization': window.sessionStorage.getItem('token')},
        }).then(result=>{
          if(result.status===200)
          {
            this.$notify.success({
              title:'成功',
              message:'上传文章成功'
            })
          }
          else
          {
            this.$notify.error({
              title:'失败',
              message:'上传文章失败'
            })
          }
        })
      }
      else{
        await axios({
          url:'/blog/add',
          method:'post',
          data:{
            "body":this.blog.body,
            "title":this.blog.title,
            "topic":this.blog.topic,
          },
          headers: {'Authorization': window.sessionStorage.getItem('token')},
        }).then(result=>{
          if(result.status==200)
          {
            this.$notify.success({
              title:'成功',
              message:'上传文章成功'
            })
          }
          else
          {
            this.$notify.error({
              title:'失败',
              message:'上传文章失败'
            })
          }
        })
      }
    },
    test(){
      this.blog.content=this.value;
      this.blog.title=this.title;
      console.log(this.blog)
    },
    initBlog(){
      this.blog.title=this.$route.query.title;
      if(this.$route.query.topic!==null)
      {
        this.blog.topic=this.$route.query.topic;
      }
      this.blog.body=this.$route.query.body;
      if(this.$route.query.id)
      {
        this.blog.id=this.$route.query.id;
      }
      this.value=this.blog.body;
    }
  }
}
</script>

<style scoped>

#markdown{
}
#title{
  float: left;


}
#submit{
  float:right;
}
#abc{
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  height: 100px;
  width: 1500px;
}
</style>