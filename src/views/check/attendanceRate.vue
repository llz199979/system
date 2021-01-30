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
      @keydown.enter.native="selectByChart" clearable
      @clear="selectByChart" :placeholder="$t('m.placeholder.name')"
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
    <el-button @click="selectByChart" size="small" type="primary">
        <i class="el-icon-search"></i>
        {{ $t("m.button.select") }}
      </el-button>
      <!-- 导出excel -->
	
	</div>

    <div v-if="tableInfo.addVisible && tableInfo.updateVisible" id="tableComponent" class="refuseCopy">
       <div id="main" style="width: 550px; height: 350px;margin-top:50px"></div>
  </div>
    <labelTop v-if="tableInfo.addVisible && tableInfo.updateVisible" :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
  
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
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
    ...mapGetters([
      'get_checkArr'
    ]),
  
  },
  mounted() {
    this.permissionArr = this.$route.meta.arr;
    this.$store.dispatch('getCheckArr');
    this.$store.dispatch('getCheckECharts',this.page)
    this.selectByChart();
      
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
      this.selectByChart();
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectByChart()
    },
    currentChange (val) {
      this.page.pageNum = val;
      this.tableInfo.currentPage = val;
      this.selectByChart()
    },
    selectAction() {
        this.$emit('buttonEvents', 'select');
        //  this.$store.dispatch('getCheckECharts', this.page);
    },
    buttonEvents(operation) {
      switch(operation) {
        case 'add': this.tableInfo.addVisible = false; break;
        case 'delete': this.deleteAction(); break;
        case 'update': this.updateAction(); break;
        case 'select': this.selectByChart(); break;
      }
    },
    selectByChart(){
      let myChart = this.$echarts.init(document.getElementById("main"));
       this.$store.dispatch("getCheckECharts",this.page).then((res) => {
        let val = res;             
        let local = this.$i18n.locale;
        myChart.setOption({
          title: {text:local==='en'?'Attendance details':local==='zh'?'出勤详情':'出勤の詳細',left: "240" },
          tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: [val.abnormal, val.late, val.normal]
    },
    series: [
        {
            name: local==='en'?'data source':local==='zh'?'数据源':'データソース',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: val.abnormalValue, name: val.abnormal},
                {value: val.lateValue, name: val.late},
                {value: val.normalValue, name: val.normal},
               
            ]
        }
    ]
        });
       })
    },
     getVal(val){
       this.selectByChart();
      this.$store.dispatch("getCheckECharts", this.page);     
    },
   
    // selectByChart() {
    //   this.$store.dispatch('getCheckECharts', this.page);
    // },
    
   
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