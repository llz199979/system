<!--element分页器-->
<template>
  <div id="label" class="refuseCopy">
    <i
      :class="labelInfo.avatar"
      style="font-size:16px;"
    />
    <!-- page-sizes 分页的范围列表
         page-size  当前分页的范围值
         page-count 展示的页数数量 1，2，3,...10
         size-change 分页组件自带页数改变的回调方法
         current-change 分页组件自带当前页改变的回调方法 -->
    <div class="block">
      <el-pagination
        :current-page="labelInfo.currentPage"
        :page-sizes="[20, 50, 100, 150, 200]" 
        :page-size="labelInfo.pageSize"
        :page-count="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="labelInfo.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  name: 'LabelTop',
  props: [
    'labelInfo'
  ],
  data () {
    return {
      // currentPage: 2
    }
  },
  methods: {
    handleSizeChange (val) { // 分页数量改变
      // 触发父组件注册页数范围大小改变函数
      this.$emit('sizeChange', val)
    },
    handleCurrentChange (val) { // 当前页切换
      this.labelInfo.currentPage = val;
      // 触发父组件注册当前页改变函数
      this.$emit('currentChange', val)
    }
  }
}
</script>
<style lang="scss" scoped>
  #label{
    // background:#f5f5f5;
    vertical-align: middle;
    // border:solid 1px #f1f2f3
    padding:0px 8px;font-size:12px;color:#909399;
    float:right;
  .level1{
    color:#39f;
  }
  .level2{
    color:#666;
  }
}
</style>
