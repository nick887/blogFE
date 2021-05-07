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
    <MarkdownPro v-model="value" :height="650" :theme="'gitHub'"></MarkdownPro>

</div>
</template>

<script>
import { MarkdownPro } from 'vue-meditor'
import axios from "axios";
axios.defaults.baseURL='http://47.116.139.54:8081'
export default {
  name: "EditMd",
  data(){
    return{
      value:'',
      blog:{
        title:null,
        topic:1,
        content:null,
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
      this.blog.content=this.value;
      console.log(this.blog);
      if(this.blog.id!==0)
      {
        await axios({
          url:'/blog/updateABlog',
          method:'post',
          data:this.blog
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
          url:'/blog/addABlog',
          method:'post',
          data:this.blog
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
      this.blog.content=this.$route.query.content;
      if(this.$route.query.id)
      {
        this.blog.id=this.$route.query.id;
      }
      this.value=this.blog.content;
    }
  }
}
</script>

<style scoped>

#markdown{
}
#title{
  width:300px;/**宽度**/
  height:100px;/**高度**/
  position:absolute;/**绝对定位**/
  left:20%;/**左边50%**/
  top:14%;/**顶部50%**/
  margin-top:-50px;/**上移-50%**/
  margin-left:-100px;/**左移-50%**/


}
#submit{
  width:300px;/**宽度**/
  height:100px;/**高度**/
  position:absolute;/**绝对定位**/
  right: 0%;
  top:17%;/**顶部50%**/
  margin-top:-50px;/**上移-50%**/
  margin-left:-100px;/**左移-50%**/
}
#abc{
  font-size: 20px;
  font-family: "Times New Roman", Times, serif;
  height: 100px;
  width: 1500px;
}
</style>