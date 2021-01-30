<!--设备管理增加-->
<template>
  <div class="height_100 eg1">
    <div class="buttonGroup" v-if="addVisible && updateVisible">
		<el-input size="small" v-model="page.userName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" placeholder="请输入用户名"
    style="width:180px;margin-right:10px;"></el-input>
		<el-button @click="selectName" size="small">
			<i class="el-icon-search"></i>
		查询</el-button>
		<el-button type="success" @click="addVisible=false;" size="small">
			<i class="el-icon-circle-plus-outline"></i>
			添加</el-button>
		<el-button type="warning" @click="updateUser" size="small">
			<i class="el-icon-edit"></i>
			修改</el-button>
		<el-button type="danger" @click="deleteDevice" size="small">
			<i class="el-icon-delete"></i>
			删除</el-button>
      <labelTop :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
	</div>
    <!-- <div class="chest">
      <div class="heart left sided top"></div>
      <div class="heart center"></div>
      <div class="heart right sided"></div>
    </div> -->
    <!-- {{get_Userlist.records[get_Userlist.records.length -1 ]}} -->
    <el-table v-if="addVisible && updateVisible"
    ref="multipleTable"
    :data="get_DeviceList.records"
    tooltip-effect="dark"
    height="calc(100% - 46px)"
    style="width: 100%" 
    :row-key="getRowKey"
    :expand-row-keys="expands"
    @row-dblclick="dblclick"
    @select="select"
    @select-all="selectAll">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column type="index" :index="table_index" align="center" width="60" :label="$t('m.label.orderNumber')" />
    <el-table-column type="expand" width="24">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="Id">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="姓名">
                  <span>{{ props.row.name }}</span>
                </el-form-item>
                <!-- <el-form-item label="年级ID">
                  <span>{{ props.row.gradeId }}</span>
                </el-form-item>
                <el-form-item label="班级ID">
                  <span>{{ props.row.classId }}</span>
                </el-form-item> -->
                <!-- <el-form-item label="内部班级ID">
                  <span>{{ props.row.internalClassId }}</span>
                </el-form-item> -->
              </el-form>
            </template>
          </el-table-column>
    <el-table-column
      prop="name"
      label="设备名"
      >
    </el-table-column>
    <el-table-column
      prop="macId"
      label="mac地址"
      >
    </el-table-column>
    <el-table-column
      prop="equipmentDesc"
      label="描述"
      show-overflow-tooltip>
    </el-table-column>
    <!-- <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column> -->
  </el-table>
  <!-- {{get_RoleList}} -->
  <el-card v-show="!addVisible || !updateVisible" class="box-card"
  shadow="always" style="height:99%;">
  <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
  <div slot="header" class="clearfix">
    <span v-text="addVisible ? '信息修改' : '设备添加' " style="color:#0c6">账号添加</span>
    <el-button style="float: right; padding: 3px 0" type="text">
      <i class="el-icon-turn-off"></i>
      操作按钮</el-button>
  </div>
  <el-form  style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="addDevice"
        size="small" label-position="left"
        :model="device"
        label-width="80px"
      >
        <el-form-item label="设备名称" prop="name">
          <el-input clearable
            v-model="device.name"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="mac地址" prop="macId">
          <el-input clearable
            v-model="device.macId"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="备注" prop="equipmentDesc">
          <el-input clearable
            v-model="device.equipmentDesc"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label-width="0" style="">
          <el-button
            type="primary"
            @click="addDevice('addDevice', device)"
          >
            确 定
          </el-button>
          <el-button @click="cancle('addDevice')">
            取 消
          </el-button>
        </el-form-item>
      </el-form>
      </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import labelTop from '../../components/page/label'
export default {
  name: 'eg1',
  components: {
    labelTop
  },
  data() {
    return {
      addVisible: true,     //添加框控制器
      updateVisible: true,  //修改框控制器
      expands: [],
      selection: [],        //选中的条目
      getRowKey(row) {      //
          return row.userId;
      },
      page: {
        currentPage: 1,
        pageSize: 20,
        roleName: '',
        total: 0,
        nameOrMacId: ''
      },
      device: {},
      rules:{
        name: { required: true, message: '设备名称为必填项', trigger: 'blur'},
        equipmentDesc: { required: true, message: '设备描述', trigger: 'blur'},
        macId: { required: true, message: 'mac地址为必填项', trigger: 'blur'},
      },
    }
  },
  computed: {
    ...mapGetters([
      'get_DeviceList',
      'get_Userlist'
    ]),
    // get_RoleList() {
    //   return this.$store.getters.get_RoleList;
    // }
    getCatalogue() {
      return JSON.parse(localStorage.getItem('catalogue'));
    }
  },
  mounted() {
    // this.$store.dispatch('getUserListPage', this.page);
    this.$store.dispatch('getDeviceList',this.page)
    // this.$store.dispatch('getRoleList');
  },
  methods: {
     select (selection, row) { // 单选
      this.selection = selection
      console.log(this.selection)
    },
    selectAll (selection) { // 多选
      // console.log(selection)
      this.selection = selection
      console.log(this.selection)
    },
    dblclick(row, cloumn, event) {
      // console.log(row)
      // if (this.expands.includes(row.id)) {
      //   this.expands = this.expands.filter(val => val !== row.id);
      // } else {
      //   this.expands.splice(0,1,row.id)
      // }
    },
     //翻页后序号连续
    table_index(index){
        return (this.page.currentPage-1) * this.page.pageSize + index + 1
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.selectName()
      console.log('sizeChange: ' + val)
    },
    currentChange (val) {
      console.log('currentChage ' + val)
      this.page.currentPage = val
      this.selectName()
    },
    // 添加与修改
		addDevice(form, device) {
			this.$refs[form].validate(valid => {
				if(valid) {
          console.log(device)
          if(this.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addDevice', device)
            .then(res => {
              console.log('addDeviceSuccess')
              this.addVisible = true;
              this.device = {};
            })
          }else{
            this.$store.dispatch('updateDevice', device)
            .then(res => {
              this.device = {};
              this.updateVisible = true;
              // this.$store.dispatch('getUserListPage', this.page)
            })
          }
				}else{
					return false;
				}
			})
    },
    deleteDevice() {
      if(this.selection.length) {
        console.log(this.selection)
        let id = this.selection[0].userId;
        this.$store.dispatch('deleteDevice', id)
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
    updateUser() {
      if(this.selection.length == 1) {
        console.log(this.selection)
        this.updateVisible = false;
        this.device = this.selection[0];
        console.log(this.selection)
        // this.device.id = this.user.id;
      }else{
          let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch('getUserListPage', this.page);
    },
    
    cancle(form) {
      if(!this.updateVisible) {
        this.device = {};
        this.selection = [];
      }
      this.addVisible = true;this.updateVisible = true
      
    }
	}
}
</script>

<style scoped>
.eg1 {
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