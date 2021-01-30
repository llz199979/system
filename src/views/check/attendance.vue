<!--考勤管理查询条件输入-->
<template>
  <div class="height_100 attendance">
    <div class="buttonGroup" v-if="tableInfo.addVisible && tableInfo.updateVisible">
  <!-- 公司名称查询 -->
  <el-input size="small" v-model="page.corporationName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.corporation')"
    style="width:170px;margin-right:10px;"></el-input>
     <!-- 部门名称查询 -->
  <el-input size="small" v-model="page.departmentName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.department')"
    style="width:170px;margin-right:10px;"></el-input>
  <!-- {{permissionArr}} -->
  <span style="display:inline-block;margin-right:10px;" v-show="permissionArr.includes('view')">
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

  <buttonList v-bind:permissionArr="permissionArr" @buttonEvents="buttonEvents"></buttonList>
      <!-- 导出excel -->
		<el-button style="margin-left:10px" type="success" @click="downloadExcel" size="small">
			<i class="el-icon-download"></i>
			{{$t('m.button.export')}}</el-button>
	</div>

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
      prop="corporationName"
       :label="$t('m.label.company')"
      >
    </el-table-column>
     <el-table-column
     align="center"
     show-overflow-tooltip
      prop="departmentName"
       :label="$t('m.label.department')"
      >
    </el-table-column>
    <el-table-column
     align="center"
     show-overflow-tooltip
      prop="deviceName"
       :label="$t('m.label.deviceName')"
      >
    </el-table-column>
     <el-table-column
      align="center"
     show-overflow-tooltip
      prop="checkingType"
       :label="$t('m.label.attendance')"
      >
    </el-table-column>
     <el-table-column
      align="center"
     show-overflow-tooltip
      prop="temperature"
       :label="$t('m.label.temperature')"
      >
    </el-table-column>
     <el-table-column
      align="center"
     show-overflow-tooltip
      prop="attendanceTime"
       :label="$t('m.label.attendanceTime')"
      >
    </el-table-column>
     <el-table-column
      align="center"
     show-overflow-tooltip
      prop="checkingDesc"
       :label="$t('m.label.description')"
      >
    </el-table-column>
  </el-table>
  </div>
    <labelTop v-if="tableInfo.addVisible && tableInfo.updateVisible" :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
  <el-card v-show="!tableInfo.addVisible || !tableInfo.updateVisible" class="box-card"
  shadow="always" style="height:99%;">
  <div slot="header" class="clearfix">
    <span class="cardHeader" v-text="tableInfo.addVisible ? $t('m.header.infoUpdate') : '考勤添加'"></span>
    <!-- <el-button style="float: right; padding: 3px 0" type="text">
      <i class="el-icon-turn-off"></i>
      操作按钮</el-button> -->
  </div>
  <!-- 点击信息修改框 -->
  <el-form style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="addAction"
        size="small" label-position="left"
        :model="form"
        label-width="80px"
      >
        <el-form-item :label="$t('m.label.name')" prop="name">
          <el-input clearable :autofocus="true"
            v-model="form.name"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.department')" prop="departmentName">
          <el-input clearable :autofocus="true"
            v-model="form.departmentName"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.company')" prop="corporationId">
         <el-select
            class="input_260" size="small"
            v-model="form.corporationId" filterable
            :placeholder="$t('m.placeholder.corporation2')">
          <el-option
            v-for="item in get_CorporationList.records"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.label.description')" prop="departmentDesc">
          <el-input clearable
            v-model="form.departmentDesc"
            class="input_260"
            autocomplete="off"
            @keydown.native.enter="addAction('addAction', form)"
          />
        </el-form-item>
        <el-form-item label="" >
          <el-button
            type="primary"
            @click="addAction('addAction', form)"
          >
            {{$t('m.button.confirm')}}
          </el-button>
          <el-button type="danger" @click="cancel">
            {{$t('m.button.cancel')}}
          </el-button>
        </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import labelTop from '../../components/page/label'
// import tables from '../../components/table/table'
import buttonList from '../../components/table/button'
export default {
  name: 'manage',
  components: {
    labelTop,
    // tables,
    buttonList
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
        get: 'get_AttendanceList', //vuex中获取当前table列表的getter函数
      },
      date: '',
      page: { 
        // currentPage:1,
        pageNum: 1,       
        pageSize: 20,
        total: 0,
        name: '',
        corporationName: '',
        departmentName: '',
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
      
      'get_CorporationList',
      // 'get_AttendanceList'
      'get_DepartmentList'
      // 'get_Userlist'
    ]),
  },
  mounted() {
    this.permissionArr = this.$route.meta.arr;
    this.$store.dispatch('getAttendanceList', this.page);
    // this.$store.dispatch('getDepartmentList', this.page);
    this.$store.dispatch('getCorporationList',{...this.page});
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
      // if (this.expands.includes(row.id)) {
      //   this.expands = this.expands.filter(val => val !== row.id);
      // } else {
      //   this.expands.splice(0,1,row.id)
      // }
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
    buttonEvents(operation) {
      switch(operation) {
        case 'add': this.tableInfo.addVisible = false; break;
        case 'delete': this.deleteAction(); break;
        case 'update': this.updateAction(); break;
        case 'select': this.selectName(); break;
      }
    },
    // 考勤记录导出
    downloadExcel() {
      let page = {...this.page};
      delete page.pageSize;
      delete page.pageNum;
      delete page.total;
      this.$store.dispatch('downloadExcel', this.page)
      .then(res => {
       
      }).catch(err => {
        
      })
    },
    // 添加与修改
		addAction(formRef, form) {
			this.$refs[formRef].validate(valid => {
				if(valid) {
          if(this.tableInfo.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addDepartment', form)
            .then(res => {
              this.tableInfo.addVisible = true;
              this.form = {};
            })
          }else{
            this.$store.dispatch('updateDepartment', form)
            .then(res => {
              this.selection = [];
              this.form = {};
              this.tableInfo.updateVisible = true;
              // this.$store.dispatch('getUserListPage', this.page)
            })
          }
				}else{
					return false;
				}
			})
    },
    deleteAction() { //删除公司
      if(this.selection.length) {
        // let id = this.selection[0].userId;
        let arr =[];
        this.selection.forEach(v => {
          arr.push(v.id);  
        })
        this.$store.dispatch('deleteAttendance', arr)
        .then(res => {

        })
      }else{
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    updateAction() {
      if(this.selection.length == 1) {
        this.tableInfo.updateVisible = false;
        this.form = JSON.parse(JSON.stringify(this.selection[0]));
        // this.corporation.id = this.user.id;
      }else{
         let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch('getAttendanceList', this.page);
    },
    
    cancel() {
      if(!this.tableInfo.updateVisible) {
        this.form = {};
        this.selection = [];
      }
      this.tableInfo.addVisible = true;this.tableInfo.updateVisible = true
      
    }
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