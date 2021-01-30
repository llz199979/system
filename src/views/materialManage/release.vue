
<template>
  <div class="height_100 department">
    <div
      class="buttonGroup"
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
    >
      <!-- <el-input
        size="small"
        v-show="permissionArr.includes('view')"
        v-model="page.name"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        :placeholder="$t('m.placeholder.fileName')"
        style="width: 190px; margin-right: 10px"
      ></el-input> -->
      <buttonList
        v-bind:permissionArr="permissionArr"
        @buttonEvents="buttonEvents"
      ></buttonList>
       <el-select
            @change="getVal(page.macId)"
            style="margin-left:20px" size="mini"
            v-model="page.macId" filterable
            :placeholder="$t('m.placeholder.equipList')">
          <el-option        
            v-for="item in get_loadEquip"
            :key="item.macId"
            :label="item.name"
            :value="item.macId">
          </el-option>
        </el-select>
    </div>
    
    <div
       v-if="tableInfo.addVisible && tableInfo.updateVisible" id="tableComponent" class="refuseCopy"
    >
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
        @select-all="selectAll"
      >
        <el-table-column type="selection"> </el-table-column>
        <el-table-column
          type="index"
          :index="table_index"
          align="center"
          width="60"
          :label="$t('m.label.orderNumber')"
        />

        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="originalName"
          :label="$t('m.label.fileName')"
        >
        </el-table-column>

      </el-table>
     
    </div>

    <!-- <labelTop
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
      :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    ></labelTop> -->
    <!-- {{tableInfo}} -->
    <el-card
      v-show="!tableInfo.addVisible || !tableInfo.updateVisible"
      class="box-card"
      shadow="always"
      style="height: 99%"
    >
      <!-- <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div> -->
      <div slot="header" class="clearfix">
        <span
          class="cardHeader"
          v-text="
            tableInfo.addVisible
              ? $t('m.header.infoUpdate')
              : $t('m.header.materialAdd')
          "
        ></span>
        <el-switch
          v-if="!tableInfo.addVisible"
          style="float: right; font-size: 12px !important"
          active-color="#13ce66"
          inactive-color=""
          v-model="switchStatus"
          :active-text="$t('m.header.addContinue')"
        >
        </el-switch>
      </div>
      <el-form
        label-width="103px"
        style="margin-left: 60px"
        class="form refuseCopy"
        :rules="rules"
        ref="addAction"
        size="small"
        label-position="left"
        :model="form"
      >
        <el-form-item :label="$t('m.label.deviceName')" prop="equipmentId">
         <el-select 
           @change="getMater(form.equipmentId)"
            class="input_260" size="small"
            v-model="form.equipmentId" filterable
            :placeholder="$t('m.placeholder.equipList')">
          <el-option
            v-for="item in get_loadEquip"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item :label="$t('m.label.materialName')" prop="mediaId">
         <el-select
            class="input_260" size="small"
            v-model="form.mediaId" filterable multiple
            :placeholder="$t('m.placeholder.materials')">
          <el-option
            v-for="item in get_loadMaterial"
            :key="item.id"
            :label="item.originalName"
            :value="item.id">
          </el-option>
        </el-select>
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
import { mapGetters } from "vuex";
// import labelTop from "../../components/page/label";
// import tables from '../../components/table/table'
import buttonList from "../../components/table/button";
export default {
  name: "manage",
  components: {
    // labelTop,
    // tables,
    buttonList,
  },
  data() {
    return {
      getRowKey(row) {
        return row.id;
      },
      detailVisible: false,
      addVisible: true, //添加框控制器
      updateVisible: true, //修改框控制器
      dialogVisible: false, //员工信息导入弹出框
       imgVisible: false,
       videoVisible:false,
      expands: [],
      selection: [], //选中的条目
      permissionArr: [],
      tableInfo: {
        //当前组件向子组件table 传值
        addVisible: true, //添加框控制器
        updateVisible: true, //修改框控制器
        currentPage: 1,
        pageSize: 20,
        get: "get_MateEquipList", //vuex中获取当前table列表的getter函数
      },
      form: {
       
      },
      page: {
        // pageNum: 1,
        // pageSize: 20,
        // originalName: "",
        // name: "",
        // type:'1',
        // total: 0,
        macId:''
      },
     
      header: {
        Authorization: localStorage.getItem("token"),
      },
      fileList: [],
      switchStatus: false,
      loadName:[],
      loadNomal:[]
    };
  },
  computed: {
    getInfo() {
      // 获取当前路由需要展示的信息table表
      if (this.tableInfo.get) {
        return this.$store.getters[this.tableInfo.get];
      }
    },
    ...mapGetters(["get_loadEquip","get_loadMaterial"]),
    // getCatalogue() {
    //   return JSON.parse(localStorage.getItem('catalogue'));
    // }
  },
  mounted() {
    this.$store.dispatch("getMateEquip",this.page);
    this.$store.dispatch("getLoadEquip");
    this.$store.dispatch("getLoadMaterial")
    this.permissionArr = this.$route.meta.arr;
      // this.$nextTick(()=>{
      // console.log('get_checkArr',this.$store.getters.get_MateEquipList)
      // let arr = JSON.stringify(this.$store.getters.get_MateEquipList)
      // console.log(arr)
      // this.page.macId = arr[0].id   
      //  })
  },
  methods: {
    table_index(index) {
      return (
        (this.tableInfo.currentPage - 1) * this.tableInfo.pageSize + index + 1
      );
    },
    select(selection, row) {
      // 单选    子组件table => 父组件传值
      this.selection = selection;
      this.$emit("select", selection);
    },
    selectAll(selection) {
      // 多选 子组件table => 父组件传值
      this.selection = selection;
      // this.$emit("selectAll", selection);
      console.log(this.selection);
    },
    dblclick(row, cloumn, event) {},
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName();
      console.log("sizeChange: " + val);
    },
    currentChange(val) {
      console.log("currentChage " + val);
      this.page.pageNum = val;
      this.tableInfo.currentPage = val;
      this.selectName();
    },
    buttonEvents(operation) {
      switch (operation) {
        case "add":
          this.tableInfo.addVisible = false;
          break;
        case "delete":
          this.deleteAction();
          break;
        case "select":
          this.selectName();
          break;
      }
    },
    handleChange(file, fileList) {
      //文件更改回调
      console.log(file, fileList);
    },
    handleClose(file, fileList) {
      this.fileList = [];
    },
    handleRemove(file, fileList) {
      this.fileList = [];
      this.$store.dispatch("deleteMaterial", file);
    },
    handlePreview(file) {
      console.log(file);
    },
    uploadClick(e) {
      this.studentPhoto = e.target.files;
    },
    uploadSuccess(res, file, fileList) {
      //上传图片成功的回调(UI内置)
      if (res.code) {
         let local = this.$i18n.local;
        local=='en'?this.$message.success("Upload successful"):local=='zh'?this.$message.success("上传成功"):this.$message.success("アップロード成功")
      } else {
        local=='en'?this.$message.error("Upload failed"):local=='zh'?this.$message.error("上传失败"):this.$message.error("アップロードに失敗しました")
        this.fileList = [];
      }
    },
    uploadError(error, file, fileList) {
      //上传图片失败的回调(UI内置)
       let local = this.$i18n.local;
       local=='en'?this.$message.error("Image upload failed"):local=='zh'?this.$message.error("图片上传失败"):this.$message.error("画像のアップロードに失敗しました")
      this.fileList = [];
    },
    uploadExceed(file, fileList) {
      //图片上传超出数量限制
       let local = this.$i18n.local;
       local=='en'?this.$message.error("Please delete the previously uploaded image first"):local=='zh'?this.$message.error("请先删除之前上传的图片"):this.$message.error("先にアップロードした写真を削除してください。")
    },
    selectAssign(value) {
      this.detailVisible = true;

      this.fileList = "";

      this.form = { ...value };
      // console.log(value);
    },
   getVal(val){
      console.log(val); 
      this.$store.dispatch("getMateEquip", this.page);
    },
    getMater(v){
        let res = this.$store.getters.get_loadEquip;
        let val = res;
        let media = []
        this.form.mediaId =[]               
         val.forEach(item => {
              // console.log('item.media',item.media)
              // console.log(v,item.id)
              if(v==item.id){
                 media = item.media;
                  media.forEach(i =>{
                    //  console.log(i.id)
                    this.form.mediaId.push(i.id) 
                    console.log('this.form.mediaId',this.form.mediaId)
                })
              }
            })
            this.$store.dispatch("getLoadEquip");
    },
   
     // 添加与修改行为
		addAction(formRef, form) {
			this.$refs[formRef].validate(valid => {
				if(valid) {
          console.log(form)
            this.$store.dispatch('addMateEquip', form)
            .then(res => {          
                this.tableInfo.addVisible = true;
              this.form = {};
               this.getMater();
            })
				}else{
					return false;
				}
			})
    },
    deleteAction() {
      //删除行为
      if (this.selection.length) {
        console.log(this.selection);
        // let id = this.selection[0].userId;
        let arr = [];
        this.selection.forEach((v) => {
          arr.push(v.id);
        });
        console.log(arr);
        this.$store.dispatch("deleteMateEquip", arr).then((res) => {
          this.getMater();
        });
      } else {
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch("getMateEquip", this.page);
    },
    comfirm() {
      this.$store.dispatch("getMateEquip", this.page);
      this.tableInfo.addVisible = true;
    },
    cancel() {
      this.tableInfo.addVisible = true;
    },
  },
};
</script>

<style land="scss" scope>
.underline {
  position: relative;
  border-bottom: solid 1px #ccc;
  padding-bottom: 6px;
  margin-bottom: 9px;
}
.openAclose {
  background: #fff;
  padding: 4px;
  border-bottom: solid 2px #39f;
  color: #39f;
  cursor: pointer;
}
.transformTab {
  padding: 4px;
  color: #999;
  cursor: pointer;
}
#tableComponent {
  height: calc(100% - 70px);
  margin-bottom: 6px;
}
.department {
  margin: 0 8px;
  text-align: left;
  position: relative;
  /* background:#ffa5a5; */
}
.input_260 {
  width: 260px;
}
label {
  position: relative;
}
.el-form-item__label:before {
  font-size: 16px;
  position: absolute;
  left: -10px;
}
.originalPicture {
  max-width: 260px;
  height: 200px;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px #999;
}

</style>