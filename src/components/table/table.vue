<!--element按钮-->
<template>
  <div v-if="tableInfo.addVisible && tableInfo.updateVisible" id="tableComponent" class="refuseCopy">
    <el-table 
    ref="multipleTable"
    :data="getInfo.records"
    tooltip-effect="dark"
    height="100%"
    style="width: 100%" 
    :row-key="getRowKey"
    :expand-row-keys="expands"
    @row-dblclick="dblclick"
    @select="select"
    @select-all="selectAll">
    <el-table-column
      type="selection"
      >
    </el-table-column>
    <el-table-column type="index" :index="table_index" align="center" width="60" :label="$t('m.label.orderNumber')" />
    <el-table-column align="center" show-overflow-tooltip
     v-for="(v, k, i) in tableInfo.parameter" :key="i"
      :prop="k"
      :label="v"
      >
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
export default {
  name: 'tables',
  props: [
    'tableInfo'
  ],
  data () {
    return {
      addVisible: true,     //添加框控制器
      updateVisible: true,  //修改框控制器
      expands: [],
      selection: [],        //选中的条目
      getRowKey(row) {      //
          return row.id;
      },
    
    }
  },
  computed: {
      getInfo() { // 获取当前路由需要展示的信息table表
          if(this.tableInfo.get){
              return this.$store.getters[this.tableInfo.get];
          }
      }
  },
  mounted() {
  
  },
  methods: {
      select (selection, row) { // 单选
      this.selection = selection;
    // 触发父组件注册的单选函数
      this.$emit('select', selection)
    },
    selectAll (selection) { // 多选
      this.selection = selection
      // 触发父组件注册的多选函数
      this.$emit('selectAll', selection)
    },
    dblclick(row, cloumn, event) {
      // if (this.expands.includes(row.id)) {
      //   this.expands = this.expands.filter(val => val !== row.id);
      // } else {
      //   this.expands.splice(0,1,row.id)
      // }
    },
    //翻页后序号连续
    table_index(index){
        return (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
    },
//     handleSizeChange (val) { // 分页数量改变
//       console.log(`每页 ${val} 条`)
//       this.$emit('sizeChange', val)
//     },
//     handleCurrentChange (val) { // 当前页切换
//       console.log(`当前页: ${val}`)
//       this.labelInfo.currentPage = val;
//       this.$emit('currentChange', val)
//     }
//   }
    }
}
</script>
<style lang="scss" scoped>
#tableComponent{
    height:calc(100% - 70px);
    margin-bottom:6px;
    // border:solid 1px;
}
</style>
