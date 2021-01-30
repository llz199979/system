<!--考勤管理查询条件输入-->
<template>
  <div class="height_100 attendance">
    <div class="buttonGroup" v-if="tableInfo.addVisible && tableInfo.updateVisible">

  <!-- {{permissionArr}} -->
  <span style="display:inline-block;margin-right:10px;" v-show="permissionArr.includes('view')">
	   <el-select
            @change="getVal(page.rosterId)"
            style="margin-right:11px;" size="small"
            v-model="page.rosterId" filterable
            :placeholder="$t('m.placeholder.checkList')">
          <el-option        
            v-for="item in get_checkArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
  	<!-- 姓名查询 -->
    <el-input size="small" v-model="page.name"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.name')"
    style="width:170px;"></el-input>
  </span>
  <!-- 日期选择 -->
    <el-date-picker size="small"
      v-model="date" @change="dateChange"
      style="width:300px;margin-right:10px;" format="yyyy-MM-dd HH:mm"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetimerange"
      range-separator="至"
      :start-placeholder="$t('m.placeholder.startTime')"
      :end-placeholder="$t('m.placeholder.endTime')">
    </el-date-picker>

  <!-- <buttonList v-bind:permissionArr="permissionArr" @buttonEvents="buttonEvents"></buttonList> -->
    <el-button @click="selectAction" size="small" type="primary">
        <i class="el-icon-search"></i>
        {{ $t("m.button.select") }}
      </el-button>
      <!-- 导出excel -->
		<el-button style="margin-left:10px" type="success" @click="downloadExcel" size="small">
			<i class="el-icon-download"></i>
			{{$t('m.button.export')}}</el-button>
	</div>

    <div v-if="tableInfo.addVisible && tableInfo.updateVisible" id="tableComponent" class="refuseCopy">
    <el-table 
    ref="multipleTable"
    :data="getInfo"
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
      <el-table-column
     align="center"
     show-overflow-tooltip
      prop="name"
       :label="$t('m.label.name')"
      >
    </el-table-column>
     <el-table-column
     align="center"
     show-overflow-tooltip
      prop="times"
       :label="$t('m.label.date')"
      >
    </el-table-column>
     <el-table-column
     align="center"
     show-overflow-tooltip
      prop="status"
       :label="$t('m.label.status')"
      >
    </el-table-column>
   
  </el-table>
  </div>
    <labelTop v-if="tableInfo.addVisible && tableInfo.updateVisible" :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import labelTop from '../../components/page/label'
// import tables from '../../components/table/table'
// import buttonList from '../../components/table/button'
export default {
  name: 'manage',
  components: {
    labelTop,
    // tables,
    // buttonList
  },
  data() {
    return {
      addVisible: true,     //添加框控制器
      updateVisible: true,  //修改框控制器
      expands: [],
      selection: [],        //选中的条目
      permissionArr: [],
      // getRowKey(row) {      //
      //     return row.id;
      // },
      tableInfo: {  //当前组件向子组件table 传值
        addVisible: true,     //添加框控制器
        updateVisible: true,  //修改框控制器
        currentPage: 1,
        pageSize: 20,
        get: 'get_recordList', //vuex中获取当前table列表的getter函数
      },
      date: '',
      page: { 
        // currentPage: 1,
        pageNum:1,
        pageSize: 20,
        total: 0,
        name: '',
        rosterId: '',
        startTime: '',
        endTime: ''
      },
      form: {},
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
      },
    // ...mapGetters([
    //   'get_checkArr'
    // ]),
    get_checkArr(){
      return this.$store.getters.get_checkArr
    },
  
  },
  // created() {
  
  // },
  mounted() {
    this.permissionArr = this.$route.meta.arr;
    this.$store.dispatch('getCheckRecord', this.page);
    this.$store.dispatch('getCheckArr')
    //  this.$nextTick(()=>{
    //   console.log('get_checkArr',this.$store.getters.get_checkArr)
    //   let arr = JSON.stringify(this.$store.getters.get_checkArr)
    //   console.log(arr)
    //   this.page.rosterId = arr[0].id   
    //    })
  },
  methods: {
  
    table_index(index){
        return (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
    },
    select (selection) { // 单选    子组件table => 父组件传值
      this.selection = selection;
    },
    selectAll (selection) { // 多选 子组件table => 父组件传值
      this.selection = selection
    },
    dblclick(row, cloumn, event)  {
     
    },
    dateChange(v) {
      if(v) {
        this.page.startTime = v[0];
        this.page.endTime = v[1];
      }else{
         this.page.startTime = '';
          this.page.endTime = '';
      }
      this.selectName();
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName()
    },
    currentChange (val) {
      this.page.pageNum = val;
      this.tableInfo.currentPage = val;
      this.selectName()
    },
    selectAction() {
        this.$emit('buttonEvents', 'select');
         this.$store.dispatch('getCheckRecord', this.page);
    },
    buttonEvents(operation) {
      switch(operation) {
        case 'add': this.tableInfo.addVisible = false; break;
        case 'delete': this.deleteAction(); break;
        case 'update': this.updateAction(); break;
        case 'select': this.selectName(); break;
      }
    },
     getVal(val){
      this.$store.dispatch("getCheckRecord", this.page);
    },
    // 考勤记录导出
    downloadExcel() {
      let page = {...this.page};
      delete page.pageSize;
      delete page.pageNum;
      delete page.total;
      this.$store.dispatch('getDownloadExcel', this.page)
      .then(res => {
       
      }).catch(err => {
        
      })
    },
   
    selectName() {
      this.$store.dispatch('getCheckRecord', this.page);
    },
    
   
	}
}
</script>

<style>
#tableComponent{
    height:calc(100% - 70px);
    margin-bottom:6px;
}
.attendance {
  margin:0 8px;	
  text-align: left;

	/* background:#ffa5a5; */
}
.input_260{
  width:260px;
}
</style>