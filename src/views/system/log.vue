<!-- 系统管理/日志管理 -->
<template>
  <div class="height_100 log">
    <div class="buttonGroup" v-if="tableInfo.addVisible && tableInfo.updateVisible">
		<!-- <el-input size="small" v-model="page.roleName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" placeholder="请输入用户名"
    style="width:180px;margin-right:10px;"></el-input> -->
		<el-input size="small" v-model="page.username"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.account')"
    style="width:180px;margin-right:10px;"></el-input>
		<el-input size="small" v-model="page.operation"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.operation')"
    style="width:180px;margin-right:10px;"></el-input>
		<el-button type="primary" @click="selectName" size="small">
			<i class="el-icon-search"></i>
		{{$t('m.button.select')}}</el-button>
		<!-- <el-button type="success" @click="tableInfo.addVisible=false;" size="small">
			<i class="el-icon-circle-plus-outline"></i>
			添加</el-button>
		<el-button type="warning" @click="updateCorporation" size="small">
			<i class="el-icon-edit"></i>
			修改</el-button>
		<el-button type="danger" @click="deleteCorporation" size="small">
			<i class="el-icon-delete"></i>
			删除</el-button> -->
	</div>
 
    <el-table 
     v-if="addVisible && updateVisible"
    ref="multipleTable"
    :data="getInfo.records"
    tooltip-effect="dark"
    height="calc(100% - 70px)"
    style="width: 100%;margin-bottom:6px;" 
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
      prop="username"
       :label="$t('m.label.username')"
      >
    </el-table-column>
    <el-table-column
    align="center"
     show-overflow-tooltip
      prop="operation"
       :label="$t('m.label.operation')"
      >
    </el-table-column>
    <el-table-column
    align="center"
     show-overflow-tooltip
      prop="ip"
       :label="$t('m.label.ip')"
      >
    </el-table-column>
  </el-table>
   <div id="tableComponent">
  <labelTop v-if="addVisible && updateVisible" :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
   </div>
  <!-- {{get_RoleList}} -->
  <!-- <el-card v-show="!tableInfo.addVisible || !tableInfo.updateVisible" class="box-card"
  shadow="always" style="height:99%;"> -->
  <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
  <!-- <div slot="header" class="clearfix">
    <span v-text="tableInfo.addVisible ? '信息修改' : '设备添加' " style="color:#0c6">账号添加</span>
    <el-button style="float: right; padding: 3px 0" type="text">
      <i class="el-icon-turn-off"></i>
      操作按钮</el-button>
  </div> -->
  <!-- <el-form  style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="addAction"
        size="small" label-position="left"
        :model="corporation"
        label-width="80px"
      >
        <el-form-item label="公司名称" prop="name">
          <el-input clearable :autofocus="true"
            v-model="corporation.name"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input clearable
            v-model="corporation.address"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input clearable maxlength="11"
            v-model="corporation.phone"
            class="input_260" show-word-limit
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input clearable
            v-model="corporation.principal"
            class="input_260"
            autocomplete="off"
            @keydown.native.enter="addAction('addAction', corporation)"
          />
        </el-form-item>
        <el-form-item label-width="0" style="">
          <el-button
            type="primary"
            @click="addAction('addAction', corporation)"
          >
            确 定
          </el-button>
          <el-button @click="cancle('addAction')">
            取 消
          </el-button>
        </el-form-item>
      </el-form> -->
      <!-- </el-card> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import labelTop from '../../components/page/label'
// import tables from '../../components/table/table'
export default {
  name: 'manage',
  components: {
    labelTop,
    // tables
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
        // delete: 'deletecorporation',
        get: 'get_LogList', //vuex中获取当前table列表的getter函数
        // parameter: {    //el-table 循环展示的属性列表
        //   'username': '用户名',
        //   'operation': '操作',
        //   'ip': 'ip地址',
        //   // 'equipmentDesc': '设备描述'
        // }
      },
      page: { 
        currentPage: 1,
        pageSize: 20,
        userName: '',
        total: 0,
        operation: ''
      },
      corporation: {},
       getRowKey(row) {      //
          return row.id;
      },
      // rules:{ // 过滤规则
      //   name: { required: true, message: '公司名称为必填项', trigger: 'blur'},
      //   address: { required: true, message: '公司地址为必填项', trigger: 'blur'},
      //   principal: { required: true, message: '负责人为必填项', trigger: 'blur'},
      //   phone: { required: true, message: '联系方式为必填项', trigger: 'blur'}
      // }
    }
  },
  computed: {
     getInfo() { // 获取当前路由需要展示的信息table表
          if(this.tableInfo.get){
              return this.$store.getters[this.tableInfo.get];
          }
      }
    // ...mapGetters([
      // 'get_corporationList',
      // 'get_Userlist'
    // ]),
    // getCatalogue() {
    //   return JSON.parse(localStorage.getItem('catalogue'));
    // }
  },
  mounted() {
    // this.$store.dispatch('getUserListPage', this.page);
    this.$store.dispatch('getLogList',this.page)
    // this.$store.dispatch('getRoleList');
  },
  methods: {
     table_index(index){
        return (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
    },
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
    // table_index(index){
    //     return (this.page.currentPage-1) * this.page.pageSize + index + 1
    // },
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName()
      console.log('sizeChange: ' + val)
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.page.currentPage = val;
      this.tableInfo.currentPage = val;
      this.selectName()
    },
    // 添加与修改
		addAction(form, corporation) {
			this.$refs[form].validate(valid => {
				if(valid) {
          console.log(corporation)
          if(this.tableInfo.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addCorporation', corporation)
            .then(res => {
              console.log('addActionSuccess')
              this.tableInfo.addVisible = true;
              this.corporation = {};
            })
          }else{
            this.$store.dispatch('updateCorporation', corporation)
            .then(res => {
              this.selection = [];
              this.corporation = {};
              this.tableInfo.updateVisible = true;
              // this.$store.dispatch('getUserListPage', this.page)
            })
          }
				}else{
					return false;
				}
			})
    },
    deleteCorporation() { //删除公司
      if(this.selection.length) {
        console.log(this.selection)
        // let id = this.selection[0].userId;
        let arr =[];
        this.selection.forEach(v => {
          arr.push(v.id);  
        })
          console.log(arr);
        this.$store.dispatch('deleteCorporation', arr)
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
    updateCorporation() {
      if(this.selection.length == 1) {
        console.log(this.selection)
        this.tableInfo.updateVisible = false;
        this.corporation = JSON.parse(JSON.stringify(this.selection[0]));
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
      this.$store.dispatch('getLogList', this.page);
    },
    
    cancle(form) {
      if(!this.tableInfo.updateVisible) {
        this.corporation = {};
        this.selection = [];
      }
      this.tableInfo.addVisible = true;this.tableInfo.updateVisible = true
      
    }
	}
}
</script>

<style scoped>
#tableComponent{
    /* height:calc(100% - 70px); */
    margin-bottom:6px;
}
.log {
  margin:0 8px;	
  text-align: left;

	/* background:#ffa5a5; */
}
.chest {
	width:500px;
	height:500px;
	margin:0 auto;
	position:relative;
}
.heart {
	position:absolute;
	z-index:2;
	background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%);
	animation:beat 2s ease 0s infinite normal;
}
.heart.center {
	background:linear-gradient(-45deg,#B80734 0%,#d5093c 40%);
}
.heart.top {
	z-index:3;
}
.sided {
	top:100px;
	width:220px;
	height:220px;
	border-radius:110px;
}
.center {
	width:210px;
	height:210px;
	bottom:100px;
	left:145px;
	transform:rotateZ(225deg);
}
.left {
	left:62px;
}
.right {
	right:62px;
}
@keyframes beat {
	0% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
50% {
	transform:scale(1.1) rotate(225deg);
	box-shadow:0 0 70px #d5093c;
}
100% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
}
.input_260{
  width:260px;
}
</style>