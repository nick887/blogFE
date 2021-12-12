<template>
<div>
  <div id="back-end">
    <el-container id="container">
      <el-container>
        <el-aside width="200px" id="aside">
          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              >
            <el-menu-item index="1" @click="gotoEditMd">
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">添加文章</span>
            </el-menu-item>
            <el-menu-item index="2" @click="gotoBlogManage">
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">文章管理</span>
            </el-menu-item>
            <el-menu-item index="3" @click="gotoFileManage">
              <i class="el-icon-circle-plus-outline"></i>
              <span slot="title">文件管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main id="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</div>
</template>

<script>
export default {
  name: "BackEnd",
  methods:{
    gotoEditMd(){
      this.$router.replace("/admin/editMd")
    },
    gotoBlogManage(){
      this.$router.replace("/admin/blogManage")
    },
    gotoFileManage(){
      this.$router.replace("/admin/fileManage")
    }
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
#back-end{
  height: 100vh;
}
#container{
  height: 100vh;
  font-size: 40px;
  font-family: "Times New Roman", Times, serif;
}
</style>