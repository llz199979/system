<!--element按钮-->
<template>
  <span v-if="permissionArr && permissionArr.length">
    <el-button type="primary" v-show="permissionArr.includes('view')" @click="selectAction" size="small">
			<i class="el-icon-search"></i>
		{{$t('m.button.select')}}</el-button>
		<el-button type="success" v-show="permissionArr.includes('add')" @click="addAction" size="small">
			<i class="el-icon-circle-plus-outline"></i>
			{{$t('m.button.add')}}</el-button>
  <el-button type="warning" v-show="permissionArr.includes('upd')" @click="updateAction" size="small">
			<i class="el-icon-edit"></i>
			{{$t('m.button.update')}}</el-button>
		<el-button type="danger" v-show="permissionArr.includes('del')" @click="deleteAction" size="small">
			<i class="el-icon-delete"></i>
			{{$t('m.button.delete')}}</el-button>
  </span>
</template>
<script>
export default {
  name: 'buttonList',
  props: [
    'permissionArr'  //获取父组件传递的值
  ],
  data () {
    return {
    }
  },
  computed: {
      getInfo() {
          if(this.tableInfo.get){
              return this.$store.getters[this.tableInfo.get];
          }
      }
  },
  mounted() {
     
  },
  methods: {
      addAction() { // 触发添加行为函数
        this.$emit('buttonEvents', 'add');
      },
      deleteAction() {
        this.$emit('buttonEvents', 'delete');
      },
      updateAction() {
        this.$emit('buttonEvents', 'update');
      },
      selectAction() {
        this.$emit('buttonEvents', 'select');
      }
    }
}
</script>
<style lang="scss" scoped>
// #tableComponent{
// }
</style>
