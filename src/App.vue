<template>
  <div id="app">
      <keep-alive>
        <router-view/>
      </keep-alive>
  </div>
</template>

<script>
import router from './router/index'


export default {
  name: 'app',
  components: {
  },
  router
}

</script>

<style>
</style>
