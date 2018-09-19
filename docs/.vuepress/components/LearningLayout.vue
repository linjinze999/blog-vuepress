<template>
  <div>{{$site}}</div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000}
Vue.use(ElementUI)
export default {
  data: function () {
    return {}
  }
}
</script>

<style scoped>


</style>