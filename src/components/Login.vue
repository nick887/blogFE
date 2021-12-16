<template>
<div id="container">
  <div id="loginCard">
    <el-card class="box-card" shadow="always">
      <div slot="header" class="clearfix">
        登陆
      </div>
      <el-form ref="form" :model="user" label-width="80px" id="form">
        <el-form-item label="账户" >
          <el-input v-model="user.email"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="user.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="loginSubmit" id="loginbtn">登陆</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>

</div>
</template>

<script>
import axios from "axios";
axios.defaults.baseURL='http://117.50.163.11:8081'
export default {
  name: "Login",
  data(){
    return{
      user:{
        email:null,
        password:null,
      }
    }
  },
  methods:{
    async loginSubmit(){
      await axios({
        method:'post',
        url:'/user/signIn',
        data:this.user
      }).then(result=>{
        if(result.status==200)
        {
          this.$notify.success({
            title:'成功',
            message:'登陆成功'
          })
          window.sessionStorage.setItem("token",result.data.token);
          this.$router.replace("/admin")
        }else {
          this.$notify.error({
            title:'失败',
            message:'登陆失败'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
#container{
  background-image: url("../assets/img/fushihui1.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: calc(100vh);
}
.clearfix{
  text-align: center;
  font-size: 40px;
  font-family: "Times New Roman", Times, serif;
}
#loginCard{
  width:500px;/**宽度**/
  height:400px;/**高度**/
  position:absolute;/**绝对定位**/
  left:38%;/**左边50%**/
  top:40%;/**顶部50%**/
  margin-top:-50px;/**上移-50%**/
  margin-left:-100px;/**左移-50%**/
  font-size: 40px;
  font-family: "Times New Roman", Times, serif;
  color: white;
  text-align: center;

}
.box-card{
  background-image: url("../assets/img/fushihui3.jpg");
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: white;
}
#form{
  font-size: 40px;
}
#loginbtn{
  margin-right: 25% ;
  width: 100px;
}

</style>