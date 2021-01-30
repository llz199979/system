<!-- 设备管理/固件管理 -->
<template>
  <div class="height_100 eg1">
    <div class="buttonGroup" v-if="tableInfo.addVisible && tableInfo.updateVisible">
    <!-- {{permissionArr}} -->
		<el-input v-show="permissionArr.includes('view')" size="small" v-model="page.nameOrMacId"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.nameOrMac')"
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
      prop="fileVersionName"
       :label="$t('m.label.fileVersionName')"
      >
    </el-table-column>
     <el-table-column
     align="center"
     show-overflow-tooltip
      prop="appName"
       :label="$t('m.label.appName')"
      >
    </el-table-column>
    <el-table-column
     align="center"
     show-overflow-tooltip
      prop="fileVersion"
       :label="$t('m.label.fileVersion')"
      >
    </el-table-column>
     <el-table-column
      align="center"
     show-overflow-tooltip
      prop="firmwareDesc"
       :label="$t('m.label.firmwareDesc')"
      >
    </el-table-column>
    <el-table-column
      align="center"
     show-overflow-tooltip
      prop="url"
       :label="$t('m.button.downLoad')"
      >
        <template slot-scope="scope">
       <a :href="scope.row.url">
               <el-button size="small" type="primary" round class="el el-icon-download">{{$t('m.button.down')}}</el-button>
      </a>
        </template>
    </el-table-column>
  </el-table>
  </div>
    <labelTop v-if="tableInfo.addVisible && tableInfo.updateVisible" :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"></labelTop>
      
   
  <el-card v-show="!tableInfo.addVisible || !tableInfo.updateVisible" class="box-card"
  shadow="always" style="height:99%;">
  <div slot="header" class="clearfix">
    <span class="cardHeader" v-text="tableInfo.addVisible ? $t('m.header.infoUpdate') : $t('m.header.firmwareAdd')"></span>
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
        :model="firmware"
        label-width="138px"
      >
      
        <el-form-item :label="$t('m.label.appName')" prop="appName">
          <el-input clearable
            v-model="firmware.appName"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.fileVersionName')" prop="fileVersionName">
          <el-input clearable
            v-model="firmware.fileVersionName"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.fileVersion')" prop="fileVersion">
          <el-input clearable
            v-model="firmware.fileVersion"
            :placeholder="$t('m.placeholder.num')"
            oninput="value=value.replace(/[^\d]/g,'')"
            maxLength='9'
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.firmwareDesc')" prop="firmwareDesc">
          <el-input clearable
            v-model="firmware.firmwareDesc"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.button.level')" prop="level">
          <el-radio-group v-model="firmware.level">
           <el-radio :label="true">{{$t('m.label.true')}}</el-radio>
           <el-radio :label="false">{{$t('m.label.false')}}</el-radio>
         </el-radio-group>
        </el-form-item>
        <el-form-item  prop="mediaId">
          <el-upload
            action="https://sports.mjktech.com.cn/media/upload"
            :headers="header"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-exceed="uploadExceed"
            multiple
            :limit="100"
             list-type="picture"
            >
            <el-button size="small" type="primary">{{$t('m.button.mediaId')}}</el-button>
          </el-upload>
        </el-form-item>
       
        <el-form-item label="" >
          <el-button
            type="primary"
            @click="addAction('addAction', firmware)"
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
  name: 'eg1',
  components: {
    labelTop,               // 分页组件
    // tables,                 // el-table组件
    buttonList              // 按钮组件
  },
  data() {
    return {
      addVisible: true,     // 添加框控制器
      updateVisible: true,  // 修改框控制器
      expands: [],
      selection: [],        // 选中的条目
      getRowKey(row) {      // 隐藏栏id设置(不能唯一)
          return row.id;
      },
      permissionArr: [],
      tableInfo: {            // 父组件向子组件传值
        addVisible: true,     // 添加框控制器
        updateVisible: true,  // 修改框控制器
        currentPage: 1,
        pageSize: 20,
        get: 'get_FirmwareList',// 将当前路由的getters函数传递过去，使之展示
      },
       header: {
        Authorization: localStorage.getItem('token')
      },
      fileList: [],
      page: {
        currentPage: 1,
        pageSize: 20,
        appName: '',
        total: 0,
        id:''
      },
      switchStatus: false,
      firmware: {
        level:true
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
      'get_FirmwareList'
    ]),
    getCatalogue() {
      return JSON.parse(localStorage.getItem('catalogue'));
    }
  },
  mounted() {
    this.$store.dispatch('getFirmwareList', this.page)
    this.permissionArr = this.$route.meta.arr;
  },
  methods: {
    select (selection) { // 单选
      this.selection = selection;
      console.log(this.selection);
    },
    selectAll (selection) { // 多选
      // console.log(selection)
      this.selection = selection;
      console.log(this.selection);
    },
    dblclick(row, cloumn, event) {
    },
     //翻页后序号连续
    table_index(index){
        return (this.page.currentPage-1) * this.page.pageSize + index + 1
    },
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
    buttonEvents(operation) {
      switch(operation) {
        case 'add': this.tableInfo.addVisible = false; break;
        case 'delete': this.deleteAction(); break;
        case 'update': this.updateAction(); break;
        case 'select': this.selectName(); break;
      }
    },
    handlePreview(file) {
      console.log(file);
    },
     handleRemove(file, fileList) {
      this.fileList = [];
      if(this.firmware.mediaId){
        this.$store.dispatch('deleteFirmware', this.firmware);
        this.firmware.mediaId = '';
      }
    },
    photoChange(file) {
      this.fileList = file;
    },
    uploadSuccess(res, file, fileList) { //上传图片成功的回调(UI内置)
      this.firmware.mediaId = res.data;
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
       local=='en'?this.$message.error("File upload failed"):local=='zh'?this.$message.error("文件上传失败"):this.$message.error("ファイルのアップロードに失敗しました")
      this.fileList = [];
    },
     uploadExceed(file, fileList) { //图片上传超出数量限制
      let local = this.$i18n.local;
       local=='en'?this.$message.error("Please delete the previously uploaded file first"):local=='zh'?this.$message.error("请先删除之前上传的文件"):this.$message.error("先にアップロードしたファイルを削除してください。")
    },
    
    // 添加与修改
		addAction(form, firmware) {
			this.$refs[form].validate(valid => {
				if(valid) {
          console.log(firmware)
          if(this.tableInfo.updateVisible){ //账号添加、修改判别
            this.$store.dispatch('addFirmware', firmware)
            .then(res => {
              this.fileList = [];
              this.firmware = {};
              if(!this.switchStatus) {
                this.tableInfo.addVisible = true;
              }
            })
          }else{
            this.$store.dispatch('updateFirmware', firmware)
            .then(res => {
              this.firmware = {};
              this.fileList = [];
              this.tableInfo.updateVisible = true;
             
            })
          }
				}else{
					return false;
				}
			})
    },
    deleteAction() {
     if (this.selection.length) {
        // let id = this.selection[0].userId;
        let arr = [];
        this.selection.forEach((v) => {
          arr.push(v.id);
        });
        console.log(arr);
        this.$store.dispatch('deleteFirmware', arr)
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
        // 从table列表中获取当前信息。
        this.firmware = JSON.parse(JSON.stringify(this.selection[0]));;
        this.page.id = this.selection[0].id
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
      this.$store.dispatch('getFirmwareList', this.page);
    },
    
    cancel() {
      if(!this.tableInfo.updateVisible) {
        this.firmware = {};
        this.selection = [];
      }
      this.tableInfo.addVisible = true;this.tableInfo.updateVisible = true
      
    }
	}
}
</script>

<style scoped>
#tableComponent{
    height:calc(100% - 70px);
    margin-bottom:6px;
}
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