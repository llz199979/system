<template>
<!-- 公司管理/部门管理 -->
  <div class="height_100 department">
    <div class="buttonGroup" v-if="tableInfo.addVisible && tableInfo.updateVisible">
		<!-- <el-input size="small" v-model="page.roleName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" placeholder="请输入用户名"
    style="width:180px;margin-right:10px;"></el-input> -->
    <el-select @change="corporationChange" clearable
      style="width:180px;margin-right:10px;" size="small"
      :autofocus="true" @clearable="selectName"
       v-model="page.corpId" filterable
        :placeholder="$t('m.placeholder.corporation')">
    <el-option
      v-for="item in get_CorporationList.records"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
		<el-input size="small" v-model="page.name"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.department')"
    style="width:180px;margin-right:10px;"></el-input>
    <buttonList v-bind:permissionArr="permissionArr" @buttonEvents="buttonEvents"></buttonList>
	
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
      prop="departmentName"
       :label="$t('m.label.department')"
      >
    </el-table-column>
    <el-table-column
     align="center"
     show-overflow-tooltip
      prop="anotherName"
       :label="$t('m.label.alias')"
      >
    </el-table-column>
     <el-table-column
      align="center"
     show-overflow-tooltip
      prop="departmentDesc"
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
  <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
  <div slot="header" class="clearfix">
    <span class="cardHeader" v-text="tableInfo.addVisible ? $t('m.header.infoUpdate') : $t('m.header.deviceAdd')"></span>
    <el-switch v-if="!tableInfo.addVisible" style="float:right;font-size:12px !important;"
      active-color="#13ce66"
      inactive-color=""
      v-model="switchStatus"
      :active-text="$t('m.header.addContinue')"
      >
    </el-switch>
  </div>
  <el-form  style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="addAction"
        size="small" label-position="left"
        :model="form"
        label-width="80px"
      >
        <el-form-item :label="$t('m.label.department')" prop="departmentName">
          <el-input clearable :autofocus="true"
            v-model="form.departmentName"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.alias')" prop="anotherName">
          <el-input clearable :autofocus="true"
            v-model="form.anotherName"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.company')" prop="corporationId">
         <el-select
            class="input_260" size="small"
            v-model="form.corporationId" filterable
              :placeholder="$t('m.placeholder.department2')">
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
      // getRowKey(row) {      //
      //     return row.id;
      // },
      tableInfo: {  //当前组件向子组件table 传值
        addVisible: true,     //添加框控制器
        updateVisible: true,  //修改框控制器
        currentPage: 1,
        pageSize: 20,
        // add: 'addAction',
        // update: 'updatecorporation',
        // delete: 'deleteAction',
        get: 'get_DepartmentList', //vuex中获取当前table列表的getter函数
        // parameter: {    //el-table 循环展示的属性列表
        //   // 'principal': '负责人',
        //   // 'phone': '电话',
        //   // 'address': '地址',
        //   'departmentName': '部门',
        //   'anotherName': '别名',
        //   'departmentDesc': '备注',
        //   // corporationId: 
        // }
      },
      page: { 
        pageNum: 1,
        pageSize: 20,
        name: '',
        total: 0,
        corpId: '',
        corporationName: ''
        // nameOrMacId: ''
      },
      permissionArr: [],
      switchStatus: false,
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
      'get_DepartmentList'
      // 'get_Userlist'
    ]),
    // getCatalogue() {
    //   return JSON.parse(localStorage.getItem('catalogue'));
    // }
  },
  mounted() {
    // this.$store.dispatch('getUserListPage', this.page);
    this.$store.dispatch('getDepartmentList', this.page);
    this.$store.dispatch('getCorporationList',{...this.page});
    this.permissionArr = this.$route.meta.arr;
    // this.$notify.info({
    //   title: '通知',
    //   message: '请先选择公司'
    // });
    console.log(this.get_DepartmentList)
    let records = this.get_DepartmentList.records;
    if(records && records.length) {
      this.page.corpId = records[0].corporationId;
    }
    // this.$store.dispatch('getRoleList');
  },
  methods: {
    select (selection) { // 单选    子组件table => 父组件传值
      this.selection = selection;
      console.log(this.selection);
    },
    selectAll (selection) { // 多选 子组件table => 父组件传值
      // console.log(selection)
      this.selection = selection
      console.log(this.selection)
    },
    dblclick(row, cloumn, event)  {
      // console.log(row)
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
    corporationChange() {
      this.$store.dispatch('getDepartmentList', this.page);
      console.log(this.page)
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName()
      console.log('sizeChange: ' + val)
    },
    currentChange (val) {
      console.log('currentChage ' + val)
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
    // 添加与修改
		addAction(formRef, form) {
			this.$refs[formRef].validate(valid => {
				if(valid) {
          console.log(form)
          if(this.tableInfo.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addDepartment', form)
            .then(res => {
              console.log('addActionSuccess')
              if(!this.switchStatus) {
                this.tableInfo.addVisible = true;
              }
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
        console.log(this.selection)
        // let id = this.selection[0].userId;
        let arr =[];
        this.selection.forEach(v => {
          arr.push(v.id);  
        })
          console.log(arr);
        this.$store.dispatch('deleteDepartment', arr)
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
        console.log(this.selection)
        this.tableInfo.updateVisible = false;
        this.form = JSON.parse(JSON.stringify(this.selection[0]));
        console.log(this.selection)
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
      this.$store.dispatch('getDepartmentList', this.page);
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

<style lang="scss" scope>
#tableComponent{
    height:calc(100% - 70px);
    margin-bottom:6px;
}
.department {
  margin:0 8px;	
  text-align: left;

	/* background:#ffa5a5; */
}
.input_260{
  width:260px;
}
.el-form{
  label{
    position:relative;
  }
  .el-form-item__label:before{
    font-size:16px;
    position:absolute;
    left:-10px;
  }
}
</style>