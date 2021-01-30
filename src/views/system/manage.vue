<!-- 系统管理/角色管理 -->
<template>
  <div class="height_100 eg1">
    <div class="buttonGroup" v-if="addVisible && updateVisible">
      <!-- 查询 -->
		<el-input size="small" v-model="page.roleName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.roleName')"
    style="width:180px;margin-right:10px;"></el-input>
    <buttonList v-bind:permissionArr="$route.meta.arr" @buttonEvents="buttonEvents"></buttonList>
      
	</div>
    <el-table v-if="addVisible && updateVisible"
    ref="multipleTable"
    :data="get_RoleList.records"
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
              </el-form>
            </template>
          </el-table-column>
    <el-table-column
      prop="role"
      label="角色名"
      >
    </el-table-column>
    <el-table-column
      prop="description"
      label="描述"
      >
    </el-table-column>
    <!-- <el-table-column
      prop="password"
      label="密码"
      >
    </el-table-column> -->
    <!-- <el-table-column
      prop="remark"
      label="备注"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      show-overflow-tooltip>
    </el-table-column> -->
  </el-table>
  <labelTop v-if="addVisible && updateVisible"
      @sizeChange="sizeChange" :label-info="page"
      @currentChange="currentChange"></labelTop>
  <el-card v-show="!addVisible || !updateVisible" class="box-card"
  shadow="always" style="height:99%;overflow-y:auto;">
  <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
  <div slot="header" class="clearfix">
    <span class="cardHeader" v-text="addVisible ? $t('m.header.infoUpdate') : $t('m.header.roleAdd')"></span>
    <el-switch v-if="!addVisible" style="float:right;font-size:12px !important;"
      active-color="#13ce66"
      inactive-color=""
      v-model="switchStatus"
      :active-text="$t('m.placeholder.roleName2')"
      >
      </el-switch>
  </div>
  <!-- {{bottomArr}} 
  <br>
  {{Array.from(new Set(menuArr))}}
  <br>
  {{defaultKey}} -->
  <el-form  style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="addAction"
        size="small" label-position="left"
        :model="permission"
        label-width="80px"
      >
        <el-form-item :label="$t('m.label.role')" prop="role">
          <el-input clearable placeholder="请输入角色名称"
            v-model="permission.role"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.description')">
          <el-input clearable
            v-model="permission.description"
            class="input_260"
            autocomplete="off"
          />
        <!-- :default-checked-keys="defaultKey" -->
        </el-form-item>
         <!-- @check="nodeKey" -->
        <el-tree ref="tree" @check-change="getKey"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :props="defaultProps">
        <!-- 默认选择 -->
        <!-- :check-on-click-node="true" -->
        <!-- :default-expanded-keys="[1, 2, 3]" -->
        <!-- :default-checked-keys="[5]" -->
        </el-tree>
        <el-form-item label="" >
          <el-button
            type="primary"
            @click="addAction('addAction', permission)"
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
import buttonList from '../../components/table/button'
export default {
  name: 'eg1',
  components: {
    labelTop,   //分页组件
    buttonList  //按钮组件
  },
  data() {
    return {
      addVisible: true,     // 添加框控制器
      updateVisible: true,  // 修改框控制器
      expands: [],          // el-table expands属性，暂时用不到
      selection: [],        // 选中的条目
      defaultKey: [],       // 角色默认的权限Id数组
      getRowKey(row) {      // el-table中每个隐藏内容都需要一个不重复的键值
          return row.roleId;// 暂时用不上
      },
      page: {               // 分页属性，供查询使用
        currentPage: 1,     // 默认当前页
        pageSize: 20,       // 单页默认数据条数
        roleName: '',       // 角色名称（根据它来模糊查询） 
        total: 0            // 后台传递的数据总数，默认为0，请求过后改变
      },
      switchStatus: false,  // 控制持续添加框的状态值，true为持续添加，false为一次添加
      permission: {         // 权限对象，
        permissionId:[]     // 权限数组
      },
      permissionArr: [],    // 当前路由的增删改查权力数组
      menuArr: [],          // 二级菜单的权限数组
      bottomArr: [],        // 三级菜单的权限数组
      data: [],            // el-tree 的data值
      defaultProps: {      // el-tree 组件默认的对象格式
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    ...mapGetters([        //computed引入vuex getters的便捷写法，需要先引入
      'get_RoleList',
      'get_Userlist'
    ]),
    // get_RoleList() {
    //   return this.$store.getters.get_RoleList;
    // }
    // getCatalogue() {
    //   return JSON.parse(localStorage.getItem('catalogue'));
    // }
  },
  mounted() {
    // 挂载后获取用户列表
    this.$store.dispatch('getRoleList', this.page);
    // this.$store.dispatch('getRoleList');
    // 获取当前路由下的权限 如：增、删、改、查。
    this.permissionArr = this.$route.meta.arr;
    // 权限表是否存入localStorage
    if(!localStorage.getItem('tree')){
      this.$store.commit('treeMenu'); //同步处理
    }
    this.data = JSON.parse(localStorage.getItem('tree'));
    
    // console.log(tree);
    // this.data = tree;
    // this.$refs['tree'].setCheckedKeys(["442479847252561903"]);
    // this.bottomArr = [4]
  },
  methods: {
    getKey(obj, v, t) {
      // 过滤一级菜单
      if(obj.children){
        return ;
      }
      if(v) {
        this.bottomArr.push(obj.id);
        this.menuArr.push(obj.parentId);
        //   if( this.menuArr.indexOf(obj.parentId) == -1 ) {
        // }
      }else{
        // var needDeleteId = this.bottomArr.indexOf(obj.id)
        // this.bottomArr.splice(needDeleteId, 1);
        var i = 0,
            parentId = 0;
        this.bottomArr.find(a => {
          if(a == obj.id){
            this.menuArr.delete(obj.parentId);
            return ;
          }
        })
        console.log(i, parentId)
        this.bottomArr.delete(obj.id);
        // if()
      }
      // this.permission.permissionId = Array.from(new Set(this.permission.permissionId));
      // console.log(obj);
      // console.log(v);
      // console.log(t);
    },
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
    table_index(index){     // el-table 默认序号不连续 每一页都是同样的序号
        return (this.page.currentPage-1) * this.page.pageSize + index + 1
    },
    sizeChange(val) {       // 父子组件传值 获取分页组件的页数范围大小
      this.page.pageSize = val;
      this.selectName()     // 调用同一实例中的异步查询方法，再查一边角色列表
      console.log('sizeChange: ' + val)
    },
    currentChange (val) {   // 父子组件传值 ，获取分页组件当前的页数
      console.log('currentChage ' + val)
      this.page.currentPage = val
      this.selectName()     // 调用同一实例中的异步查询方法，再查一边角色列表
    },
    buttonEvents(operation) { // 子组件button触发的函数
      switch(operation) {     // 根据operation判断其操作
        case 'add': this.addVisible = false; break;
        case 'delete': this.deleteAction(); break;
        case 'update': this.updateAction(); break;
        case 'select': this.selectName(); break;
      }
    },
    // 添加与修改行为
		addAction(form, permission) {
      // el-form 默认监测函数：
			this.$refs[form].validate(valid => {
				if(valid) {
          // console.log(permission)
          // 二级目录的数组去重
          let menuId = Array.from(new Set(this.menuArr));
          // 将三级菜单权限数组与二级目录进行连接。
          this.permission.permissionId = this.bottomArr.concat(menuId)
          console.log(this.permission.permissionId)
          if(this.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addRole', permission)
            .then(res => {
              console.log('addActionSuccess')
              if(!this.switchStatus) { // 是否进行连续添加
                this.addVisible = true;// 否
              }
              this.permission = {};    // form表单的data值
              this.menuArr = [];       // 顶级菜单的权限数组init
              this.bottomArr = [];     // 二级级菜单的权限数组init
              this.defaultKey = []     // 权限默认值初始化
              this.$refs['tree'].setCheckedKeys([]); // 清除el-tree的选中状态
            })
          }else{
            this.$store.dispatch('updateRole', permission)
            .then(res => {
              this.permission = {};
              this.updateVisible = true;
              // this.$store.dispatch('getUserListPage', this.page)
            })
          }
				}else{
          // 输入错误或缺漏，会显示错误提示
					return false;
				}
			})
    },
    deleteAction() {  //删除行为
      if(this.selection.length) {
        // 之前select函数会改变this.selection的值
        console.log(this.selection)
        let arr = [];
        // 删除只需要角色Id的数组
        this.selection.forEach(v => {
          arr.push(v.roleId);
        })
        this.$store.dispatch('deleteRole', arr)
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
    // 修改行为之前的准备
    updateAction() {
      // 一次只能修改一个角色，即选中一个角色
      if(this.selection.length == 1) {
        console.log(this.selection)
        this.updateVisible = false;  //显示修改框
        this.permission = this.selection[0]; //获取当前角色的固有属性
        this.permission.id = this.permission.roleId;
        // 根据roleId查询当前角色下的权限数组列表
        this.$store.dispatch('getRoleById', this.permission.id)
        .then(res => {
          // el-tree 权限默认值的注入
          res.forEach(v => {
            console.log(v)
            this.defaultKey.push(v.permissionId)
          })
        console.log(this.data)
        let menu = [];
        // 获取所有二级菜单的权限Id
        this.data.forEach(r => {
          r.children.forEach(c => {
            menu.push(c.id);
          })
        })
        console.log(menu)
        // 过滤掉二级菜单的权限Id
        this.defaultKey = this.defaultKey.filter((d, i) => {
          return !menu.includes(d)
        })
        // 将处理后的权限Id数组付给el-tree组件
        this.$refs['tree'].setCheckedKeys(this.defaultKey);
        // this.$refs['tree'].setCheckedKeys(["442479847252561903", "442479847252561904", "442479847252561905"]);
        })
      }else{
         let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {    //根据page值进行查找
      this.$store.dispatch('getRoleList', this.page);
    },
    cancel() {        //取消操作，数据初始化
      // if(!this.updateVisible) {
        this.permission = {};
        // this.permission.permissionId = [];
        this.selection = [];
        this.menuArr = [];
        this.bottomArr = [];
        this.defaultKey = []
        this.$refs['tree'].setCheckedKeys([]);
      // }
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