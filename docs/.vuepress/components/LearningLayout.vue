<template>
  <div>
    <div class="my-ln-page">
      <el-card shadow="hover" v-for="page in pageList.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="page.title">
        <h2>{{ page.title }}</h2>
        <div slot="header" class="clearfix">
          <span>{{ page.title }}</span>
          <span v-if="page.time" style="float: right; padding-right: 5px">{{ page.time }}</span>
        </div>
        <div class="my-ln-card-content">
          {{ page.content }}
        </div>
      </el-card>
      <br/>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotal">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.prototype.$ELEMENT = {size: 'small', zIndex: 3000}
Vue.use(ElementUI)
export default {
  props: {
    pageList: {type: Array, required: true}
  },
  data: function () {
    const pageTotal = this.pageList.length
    return {
      currentPage: 1,
      pageSize: 10,
      pageTotal
    }
  },
  methods: {
    handleSizeChange (size) {
      this.pageSize = size
    },
    handleCurrentChange (currentPage) {
      this.currentPage = currentPage
    },
  }
}
</script>

<style scoped>
.my-ln-page {
  max-width: 600px;
  margin: 0 auto;
}
.my-ln-card-content {
  max-height: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>