<!-- 公司管理/员工管理 -->
<template>
  <div class="height_100 department">
    <div class="buttonGroup" v-if="tableInfo.addVisible && tableInfo.updateVisible">
		<!-- <el-input size="small" v-model="page.roleName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" placeholder="请输入用户名"
    style="width:180px;margin-right:10px;"></el-input> -->
    <el-select @change="corporationChange"
      style="width:180px;margin-right:10px;" size="small"
      :autofocus="true" clearable
      v-model="page.corpId" filterable
      :placeholder="$t('m.placeholder.school')">
    <el-option
      v-for="item in get_CorporationList.records"
      :key="item.id"
      :label="item.name"
      :value="item.id">
    </el-option>
  </el-select>
    <el-select @change="departmentChange" @clear="selectName"
      style="width:180px;margin-right:10px;" size="small"
      :autofocus="true" clearable
      v-model="page.departmentId" filterable
      :placeholder="$t('m.placeholder.class')">
    <el-option
      v-for="item in department"
      :key="item.id"
      :label="item.departmentName"
      :value="item.id">
    </el-option>
  </el-select>
		<el-input size="small" v-model="page.nameOrPhone"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.nameOrPhone')"
    style="width:190px;margin-right:10px;"></el-input>
    <buttonList v-bind:permissionArr="permissionArr" @buttonEvents="buttonEvents"></buttonList>
   
 <el-button style="margin-left:10px" size="small" @click="dialogVisible = true"><i class="el-icon-upload2" /> {{$t('m.button.import')}}</el-button>
    <el-dialog v-el-drag-dialog
      title="员工信息导入"
      :visible.sync="dialogVisible"
      width="500px" center
      @close="handleClose"
      >
      <el-upload 
      class="upload-demo center"
      accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      action="https://sports.mjktech.com.cn/corporation/upload"
      :limit="1"
      :headers="header"
      :on-change="handleChange"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :file-list="fileList">
      <a href="http://mjkband01.oss-cn-shenzhen.aliyuncs.com/信息导入模板.xlsx" target="_target" style="margin-right:10px;">
        <el-button style="margin-left:10px" size="small" @click.stop=""><i class="el-icon-document-copy" /> 模板下载</el-button>
      </a>
      <el-button size="small" type="primary"><i class="el-icon-s-promotion"/>点击上传</el-button>
      <div slot="tip" class="el-upload__tip">请上传文件</div>
    </el-upload>
    <!-- <uploadFile v-bind:fileInfo="staffInfos">
              <template v-slot:template>
                <router-link style="margin-left:10px;" target="_blank" to="/template/staff.xlsx">
                  <el-button size="small" plain>
                  模板
                  </el-button>
                </router-link>
              </template>
            </uploadFile> -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">完 成</el-button>
        <!-- <el-button size="small" type="primary" @click="dialogVisible = false;this.fileList = [];">确 定</el-button> -->
      </span>
    </el-dialog>
     <el-upload class="pictureUpload"
            action="https://sports.mjktech.com.cn/corporation/uploadPicture"
            :headers="header"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-exceed="uploadExceed"          
             multiple
            :limit="100" 
            accept="image/png,image/jpg,image/jpeg"
           >
            <el-button size="small" type="primary">{{$t('m.label.uploadImg')}}</el-button>
            <!-- <div slot="tip" class="el-upload__tip" style="font-size:13px;">{{$t('m.label.uploadMessage')}}</div> -->
          </el-upload>
           <el-button style="margin-left:10px" type="success" @click="downloadExcel" size="small">
			<i class="el-icon-download"></i>
			{{$t('m.button.massageExport')}}</el-button>
         
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
      prop="jobNumber"
       :label="$t('m.label.number')"
      >
    </el-table-column>
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
      prop="sex"
       :label="$t('m.label.gender')"
      >
    </el-table-column>
    <el-table-column
     align="center"
     show-overflow-tooltip
      prop="phone"
       :label="$t('m.label.parentPhone')"
      >
    </el-table-column>
     <el-table-column
     align="center"
     show-overflow-tooltip
      prop="post"
       :label="$t('m.label.job')"
      >
    </el-table-column>
      <el-table-column align="center" :label="$t('m.label.picture')" prop="pictureUrl">
            <template slot-scope="scope">
              <viewer>
              <img :src="scope.row.pictureUrl" style="width:50px;height:50px;" srcset />
              </viewer>
            </template>
          </el-table-column> 
     <el-table-column
            align="center"
           :label="$t('m.label.operation')"
            width="200"
          >
             <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                round
                @click="selectAssign(scope.row)"
              >
              {{$t('m.label.details')}}
            </el-button>
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                round
                @click="updateAssign(scope.row)"
              />
            </template>
          </el-table-column>  
  </el-table> 
   <el-dialog v-el-drag-dialog
      custom-class="dialog"
      width="500px"
      top="10vh" :modal="false"
      :visible.sync="detailVisible"
      center
      :title="$t('m.label.details')"
      
    >
       <el-form  style="margin-left:50px;"
        class="form refuseCopy" 
        size="small" label-position="left"
        :model="form"
        label-width="105px"
      >
       <el-form-item :label="$t('m.label.number')" prop="jobNumber">
          <el-input
           type="textarea"
           autosize
            v-model="form.jobNumber"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.name')" prop="name">
          <el-input
           type="textarea"
           autosize
            v-model="form.name"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.gender')" prop="sex">
          <el-input
           type="textarea"
           autosize
            v-model="form.sex"
            style="width:250px"
            autocomplete="off"
          />
        </el-form-item>
          <el-form-item :label="$t('m.label.phone')" prop="phone">
          <el-input
           type="textarea"
           autosize
            v-model="form.phone"
            style="width:250px;"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.school')" prop="corporationName">
          <el-input
           type="textarea"
           autosize
            v-model="form.corporationName"
            style="width:250px;"
            autocomplete="off"
          /> 
           </el-form-item>
         <el-form-item :label="$t('m.label.class')" prop="departmentName">
          <el-input
           type="textarea"
           autosize
            v-model="form.departmentName"
            style="width:250px;"
            autocomplete="off"
          /> 
        </el-form-item>
         <el-form-item :label="$t('m.label.job')" prop="post">
          <el-input
           type="textarea"
           autosize
            v-model="form.post"
            style="width:250px;"
            autocomplete="off"
          /> 
        </el-form-item>
        <el-form-item :label="$t('m.label.family')" prop="patriarch">
          <el-input
           type="textarea"
           autosize
            v-model="form.patriarch"
            style="width:250px;"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.description')" prop="personalDesc">
          <el-input
           type="textarea"
           autosize
            v-model="form.personalDesc"
            style="width:250px;"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.picture')" prop="pictureUrl">
           <viewer>
          <img width="80%" :src="form.pictureUrl" >
          </viewer>
        </el-form-item>
       </el-form>
     
    </el-dialog>
   </div>
    <labelTop v-if="tableInfo.addVisible && tableInfo.updateVisible" :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
    <!-- {{tableInfo}} -->
  <el-card v-show="!tableInfo.addVisible || !tableInfo.updateVisible" class="box-card"
  shadow="always" style="height:140%;">
  <div slot="header" class="clearfix">
    <span class="cardHeader" v-text="tableInfo.addVisible ? $t('m.header.infoUpdate') : $t('m.header.staffAdd') "></span>
    <el-switch v-if="!tableInfo.addVisible" style="float:right;font-size:12px !important;"
      active-color="#13ce66"
      inactive-color=""
      v-model="switchStatus"
      :active-text="$t('m.header.addContinue')"
      >
    </el-switch>
  </div>
  <el-form label-width="82px" style="margin-left:60px;"
        class="form refuseCopy" :rules="rules" ref="addAction"
        size="small" label-position="left"
        :model="form"
      >
        <el-form-item :label="$t('m.label.number')" prop="jobNumber">
          <el-input clearable :autofocus="true"
            v-model="form.jobNumber"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.name')" prop="name">
          <el-input clearable :autofocus="true"
            v-model="form.name"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.gender')" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="$t('m.label.male')"></el-radio>
          <el-radio :label="$t('m.label.female')"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item :label="$t('m.label.school')" prop="corporationId">
         <el-select
            class="input_260" size="small"
            v-model="form.corporationId" filterable
            @change="formChange"
            :placeholder="$t('m.placeholder.school2')">
          <el-option
            v-for="item in get_CorporationList.records"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.label.class')" prop="departmentId">
         <el-select clearable
          class="input_260" size="small"
              :autofocus="true"
              v-model="form.departmentId" filterable
              :placeholder="$t('m.placeholder.class2')">
            <el-option
              v-for="item in departmentList"
              :key="item.id"
              :label="item.departmentName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.label.job')" prop="post">
          <el-input clearable :autofocus="true"
            v-model="form.post"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.idCard')" prop="idCard">
          <el-input v-model="form.idCard" :placeholder="$t('m.placeholder.idCard')" class="input_260"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label.fingerPrint1')" prop="fingerprint">
          <el-input v-model="form.fingerprint" :placeholder="$t('m.placeholder.fingerPrint')" class="input_260" type="textarea" autosize></el-input>
        </el-form-item>
         <el-form-item :label="$t('m.label.finger2')" prop="fingerprint2">
          <el-input v-model="form.fingerprint2" :placeholder="$t('m.placeholder.fingerPrint')" class="input_260" type="textarea" autosize></el-input>
        </el-form-item>
         <el-form-item :label="$t('m.label.fingerP3')" prop="fingerprint3">
          <el-input v-model="form.fingerprint3" :placeholder="$t('m.placeholder.fingerPrint')" class="input_260" type="textarea" autosize></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label.description')" prop="personalDesc">
          <el-input clearable :autofocus="true"
            v-model="form.personalDesc"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item :label="$t('m.label.family')" prop="patriarch">
          <el-input clearable :autofocus="true"
            v-model="form.patriarch"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.phone')">
          <el-input clearable :autofocus="true"
            v-model="form.phone" maxlength="11"
            class="input_260" show-word-limit
            autocomplete="off" @keydown.native.enter="addAction('addAction', form)"
          />
        </el-form-item>
        
        <el-form-item style="position:absolute;top:80px;left:400px;">
          <el-upload class="input_260"
            action="https://sports.mjktech.com.cn/media/uploadImage"
            :headers="header"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :before-upload="beforeUpload"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-exceed="uploadExceed"
            :limit="1" accept="image/png,image/jpg,image/jpeg"
            list-type="picture">
            <el-button size="small" type="primary">{{$t('m.label.uploadImg')}}</el-button>
            <div slot="tip" class="el-upload__tip" style="font-size:13px;">{{$t('m.label.uploadMessage')}}</div>
          </el-upload>
          <!-- {{form.pictureUrl}} -->
          <div  v-show="form.pictureUrl">
            <p style="transition: all 0.5s linear;color:#42b9a0;font-size:13px;margin-top:20px;">当前照片</p>
            <img class="originalPicture" :src="form.pictureUrl">
          </div>
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
      //  fileInfo: {
      //   action: 'http://47.106.181.248:8777/media/uploadImage',
      //   limit: 50,
      //   accept: 'image/gif, image/jpeg, image/png',
      //   type: 'warning'
      // },
      // staffInfos: {
      //   action: 'http://192.168.1.238:8080/corporation/upload',
      //   limit: 1,
      //   accept: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      //   type: 'warning'
      // },
       getRowKey(row) {
          return row.id;
      },
       detailVisible:false,
      addVisible: true,     //添加框控制器
      updateVisible: true,  //修改框控制器
      dialogVisible: false, //员工信息导入弹出框
      expands: [],
      selection: [],        //选中的条
      studentPhoto: [],  //学生照片
      permissionArr: [],
      tableInfo: {  //当前组件向子组件table 传值
        addVisible: true,     //添加框控制器
        updateVisible: true,  //修改框控制器
        currentPage: 1,
        pageSize: 20,
        // add: 'addAction',
        // update: 'updatecorporation',
        // delete: 'deleteAction',
        get: 'get_StaffList', //vuex中获取当前table列表的getter函数
        parameter: {    //el-table 循环展示的属性列表
          jobNumber: '学号',
          name: '姓名',
          phone: '家长电话',
          sex: '性别',
          post: '职务',
          // 'principal': '负责人',
          // patriarch: '紧急联系人',
          // 'personalDesc': '备注',
       
          // corporationId: 
        }
      },
       form: {
        jobNumber:'',
        name: "",
        sex: "", 
        phone:"",
        post:'',
        patriarch:'',
        personalDesc:'',
        pictureUrl:'',
      },
      page: { 
        pageNum: 1,
        pageSize: 20,
        corporationId:'',
        name: '',
        total: 0,
        corpId: '',
        corporationName: '',
        departmentId: '',
        nameOrPhone: '',
        departmentName:''
      },
      header: {
        Authorization: localStorage.getItem('token')
      },
      fileList: [],
      switchStatus: false,
      form: {},
      department: [],
      departmentList: [],
      // rules:{ // 过滤规则
      //   jobNumber: { required: true, message: '工号为必填项', trigger: 'blur'},
      //   name: { required: true, message: '姓名为必填项', trigger: 'blur'},
      //   sex: { required: true, message: '性别为必填项', trigger: 'blur'},
      //   corporationId: { required: true, message: '隶属公司为必填项', trigger: 'blur'},
      //   departmentId: { required: true, message: '所属部门为必填项', trigger: 'blur'},
      //   // personalDesc: { required: true, message: '备注为必填项', trigger: 'blur'},
      //   // phone: { required: true, message: '联系方式为必填项', trigger: 'blur'}
      // }
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
    this.$store.dispatch('getStaffList', this.page);
    this.$store.dispatch('getCorporationList', {...this.page})
    //  this.$store.dispatch('getDepartmentIdList',this.page)
    this.permissionArr = this.$route.meta.arr;
    // this.$store.dispatch('getStaffList',this.page);
    // this.$notify.info({
    //   title: '通知',
    //   message: '请先选择公司'
    // })
    // this.$store.dispatch('getRoleList');
  },
  methods: {
      table_index(index){
      // console.log(this.tableInfo)
        return (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
    },
    select (selection,row) { // 单选    子组件table => 父组件传值
      this.selection = selection;
      console.log(this.selection);
       this.$emit('select', selection)
    },
    selectAll (selection) { // 多选 子组件table => 父组件传值
      // console.log(selection)
      this.selection = selection
       this.$emit('selectAll', selection)
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
    corporationChange(id) {
      console.log(id)
      this.page.corpId = id;
      this.$store.dispatch('getStaffList', this.page)
      if(!id) {
        this.page.departmentId = '';
        this.department = [];
        // this.form.corporationId = '';
      }else{
        // this.form.corporationId = id;
        // this.form.departmentId = '';
        // this.page.cropId = id;
        this.page.departmentId = '';
        this.$store.dispatch('getStaffList', this.page)
        this.$store.dispatch('getDepartmentList', this.page)
        .then(res => {
          console.log(res.records);
          this.department = res.records;
          // this.form.departmentId = '';
        })
      }
    },
    departmentChange(id) {
      // this.form.departmentId = id;
      // this.page.departmentId = id;
      this.$store.dispatch('getStaffList', this.page)
      console.log(this.page)
    },
    formChange(id) {
      console.log(id);
      let page = {...this.page};
      page.corpId = id;
      delete this.form.departmentId;
      this.$store.dispatch('getDepartmentList',page)
      .then(res => {
        this.departmentList = res.records;
      })
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
    downloadExcel() {
      let page = {...this.page};
      delete page.pageSize;
      delete page.pageNum;
      delete page.total;
      this.$store.dispatch('getStaffMassage', this.page)
      .then(res => {
       
      }).catch(err => {
        
      })
    },
    buttonEvents(operation) {
      switch(operation) {
        case 'add': this.tableInfo.addVisible = false; break;
        case 'delete': this.deleteAction(); break;
        case 'update': this.updateAction(); break;
        case 'select': this.selectName(); break;
      }
    },
    handleChange(file, fileList) { //文件更改回调
      console.log(file, fileList)
    },
    handleClose(file, fileList) {
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      console.log('handleRemove')
      console.log(file, fileList);
      console.log(this.form);
      this.fileList = [];
      if(this.form.pictureId){
        this.$store.dispatch('delPicture', this.form);
        this.form.pictureId = '';
      }
    },
    handlePreview(file) {
      console.log(file);
    }, 
    beforeUpload(file) {
      var testmsg=/^image\/(jpeg|png|jpg)$/.test(file.type);
      const isLt4M = file.size / 1024/1024 <=4;//图片大小不超过2MB
      if (!testmsg) {
        let local = this.$i18n.local; 
        local=='en'? this.$message.error('Upload image format is wrong!'):local=='zh'?this.$message.error('上传图片格式不对!'):this.$message.error('画像のアップロードフォーマットが間違っています。')
        return ;
      }
      if(!isLt4M) {
       let local = this.$i18n.local; 
        local=='en'? this.$message.error('Upload image size cannot exceed 4m!'):local=='zh'?this.$message.error('上传图片大小不能超过 4M!'):this.$message.error('アップロード画像のサイズは4 Mを超えてはいけません。!')
        return ;
      }
      return testmsg  && isLt4M;
    },
     uploadClick(e) {
      this.studentPhoto = e.target.files;
      // console.log(e.target.files)
    },
     student_photo_upload() {
      let uploadFile = document.querySelector('#File1').files;
      // console.log(Object.prototype.toString.call(uploadFile))
      let formData =new FormData();
      if(uploadFile) {
        uploadFile.forEach(v => {
          formData.append('file', v);
        })
      }
      // let formData = new FormData($("#uploadForm")[0]);
      let id = '';
      if(!this.studentPhoto.length){
       let local = this.$i18n.local;
       local=='en'?this.$message.error("Please upload the picture first"):local=='zh'?this.$message.error("请先上传图片"):this.$message.error("まず画像をアップロードしてください")
        return ;
      }
      // let loading = this.openLoading();
      this.$store.dispatch('uploadBatch', formData)
      //  axios({
      //     url: `http://192.168.1.238:8080/corporation/uploadPicture`,
      //     method: 'post',
      //     data: formData
      //   })
      .then(() => {
        this.studentPhoto = [];
        // loading.close();
      }).catch(() => {
        // loading.close();
      })
     },
    uploadSuccess(res, file, fileList) { //上传图片成功的回调(UI内置)
      console.log(res);
      this.form.pictureId = res.data;
      console.log(file)
      console.log(fileList);
       if (res.code) {
         let local = this.$i18n.local;
        local=='en'?this.$message.success("Upload successful"):local=='zh'?this.$message.success("上传成功"):this.$message.success("アップロード成功")
      } else {
        local=='en'?this.$message.error("Upload failed"):local=='zh'?this.$message.error("上传失败"):this.$message.error("アップロードに失敗しました")
        this.fileList = [];
      }
    },
    uploadError(error, file, fileList) { //上传图片失败的回调(UI内置)
       let local = this.$i18n.local;
       local=='en'?this.$message.error("Image upload failed"):local=='zh'?this.$message.error("图片上传失败"):this.$message.error("画像のアップロードに失敗しました")
      this.fileList = [];
    },
    uploadExceed(file, fileList) { //图片上传超出数量限制
       let local = this.$i18n.local;
       local=='en'?this.$message.error("Please delete the previously uploaded image first"):local=='zh'?this.$message.error("请先删除之前上传的图片"):this.$message.error("先にアップロードした写真を削除してください。")
    },
      selectAssign(value) {
   
      this.detailVisible = true;
    
      this.fileList = '';
      // delete value.gender;
      this.form = {...value};
    },
    updateAssign(value) {
       this.tableInfo.updateVisible = false;
       this.fileList = '';
      this.form = {...value};
    },
    // 添加与修改行为
		addAction(formRef, form) {
			this.$refs[formRef].validate(valid => {
				if(valid) {
          console.log(form)
          if(this.tableInfo.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addStaff', form)
            .then(res => {
              console.log('addActionSuccess')
              if(!this.switchStatus) {
                this.tableInfo.addVisible = true;
              }
              // this.page.corpId = form.corporationId
              // this.page.departmentId = form.departmentId;
              this.$store.dispatch('getStaffList', this.page);
              this.fileList = [];
              this.form = {};
            })
          }else{
            // delete form.pictureUrl;
            this.$store.dispatch('updateStaff', form)
            .then(res => {
              this.selection = [];
              this.form = {};
              this.fileList = [];
              this.tableInfo.updateVisible = true;
              // this.$store.dispatch('getUserListPage', this.page)
            })
          }
				}else{
					return false;
				}
			})
    },
    deleteAction() { //删除行为
      if(this.selection.length) {
        console.log(this.selection)
        // let id = this.selection[0].userId;
        let arr = [];
        this.selection.forEach(v => {
          arr.push(v.id);  
        })
          console.log(arr);
        this.$store.dispatch('deleteStaff', arr)
        .then(res => {
          // console.log('0000')
          // if(this.selection.pictureId){
          //   let picture = {
          //     pictureId: this.selection.pictureId,
          //     url: ''
          //   };
          //   console.log(picture)
          //   this.$store.dispatch('delPicture', picture)
          // }
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
        let page = {...this.page};
        page.corpId = this.form.corporationId;
        //delete this.form.departmentId;
        this.$store.dispatch('getDepartmentList',page)
        .then(res=>{
          this.departmentList = res.records;
        })
      }else{
         let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      console.log(this.page)
      this.$store.dispatch('getStaffList', this.page);
    },
    
    cancel() {
      if(!this.tableInfo.updateVisible) {
        this.form = {};
        this.selection = [];
      }else{
        this.handleRemove();
      }
      this.tableInfo.addVisible = true;
      this.tableInfo.updateVisible = true
      
    }
	}
}
</script>

<style>
#tableComponent{
    height:calc(100% - 70px);
    margin-bottom:6px;
}
.department {
  margin:0 8px;	
  text-align: left;
  position:relative;
	/* background:#ffa5a5; */
}
.input_260{
  width:260px;
}
label{
  position:relative;
}
.el-form-item__label:before{
  font-size:16px;
  position:absolute;
  left:-10px;
}
.originalPicture{
  
  max-width:260px;
  height:200px;
  border-radius:10px;
  padding:10px;
  box-shadow: 0 0 10px #999;
}
.pictureUpload{
  display: inline-block;
  margin-left: 12px;
}
</style>