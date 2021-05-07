<template>
<div>
  <el-upload
      class="upload-demo"
      ref="upload"
      action="http://47.116.139.54/file/upload"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      multiple>
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
  </el-upload>
</div>
</template>

<script>
export default {
  name: "FileManage",
  data() {
    return {
      fileList: [],
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  }
}
</script>

<style scoped>

</style>