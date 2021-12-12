<template>
<div>
  <div id="pageHelperUp">
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="this.pageNum"
        :page-size="this.pageSize"
        :total="this.total"
        @prev-click="Prev"
        @next-click="Next"
        @current-change="currentChange"
    >
    </el-pagination>
    <el-button type="success" @click="gotoEdit" id="addBlog">添加文章</el-button>
  </div>
  <el-table
      :data="blogList"
      stripe
      style="width: 100%">
    <el-table-column
        prop="id"
        label="id"
        width="300">
    </el-table-column>
    <el-table-column
        prop="title"
        label="标题"
        width="180">
    </el-table-column>
    <el-table-column
        prop="created"
        label="发布时间">
    </el-table-column>
    <el-table-column
        prop="updated"
        label="更新时间">
    </el-table-column>
    <el-table-column
        prop="visitCount"
        label="访问量">
    </el-table-column>
    <el-table-column
        prop="likes"
        label="喜欢">
    </el-table-column>
    <el-table-column
        label="操作"
        >

      <template slot-scope="scope">
      <el-button type="primary" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
      <el-popconfirm @confirm="handleDelete(scope.row)"
          confirm-button-text='好的'
          cancel-button-text='不用了'
          icon="el-icon-info"
          icon-color="red"
          title="这是一段内容确定删除吗？"
          id="delete"
      >
        <el-button type="danger"  slot="reference">删除</el-button>
      </el-popconfirm>
        </template>



    </el-table-column>
  </el-table>
  <div id="pageHelperDown">
    <el-pagination
        background
        layout="prev, pager, next"
        :current-page="this.pageNum"
        :page-size="this.pageSize"
        :total="this.total"
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
axios.defaults.baseURL='http://localhost:8081'
export default {
  name: "BlogManage",
  methods:{
    getBlogList(){
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      axios({
         method: 'post',
        url:'/blog',
        data:{
          "offset": this.pageNum,
          "limit": this.pageSize,
        }
      }).then(result=>{
        loading.close();
        this.blogList=result.data.blogs;
        this.total=result.data.total;
        console.log(this.blogList)
      })
    },
    Prev(){
      this.pageNum--;
      this.getBlogList();
    },
    Next(){
      this.pageNum++;
      this.getBlogList();
    },
    currentChange(val){
      this.pageNum=val;
      this.getBlogList();
    },
    handleDelete(row){
        axios({
          url:'/blog/delete',
          data:{
            "id":row.id,
          }
        }).then(result=>{
          if(result.status==200)
          {
            this.$notify.success({
              title:"成功",
              message:'删除文章成功'
            })
            this.getBlogList();
          }else {
            this.$notify.error({
              title:'失败',
              message:'删除文章失败'
            })
          }
        })
    },
    handleUpdate(row){
      this.$router.push({
        path:'/admin/editMd',
        query:{
          title:row.title,
          topic:row.topic,
          body:row.body,
          id:row.id,
        }
      })
    },
    gotoEdit() {
      this.$router.push('/admin/editMd')
    }
  },
  computed:{

  }
  ,
  created() {
    this.getBlogList();

  },
  data(){
    return{
      pageNum:1,
      pageSize:10,
      blogList:[
        {
          body:null,
          id:0,
          likes:0,
          created:null,
          title:null,
          updated:null,
          visitCount:null,
        }
      ],
      total:10,
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


#delete{
  margin: 10px;
}
#addBlog{
  float: right;
  text-align: center;
}
</style>