
<template>
  <div class="height_100 department">
    <div
      class="buttonGroup"
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
    >
      <el-input
        size="small"
        v-show="permissionArr.includes('view')"
        v-model="page.name"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        :placeholder="$t('m.placeholder.fileName')"
        style="width: 190px; margin-right: 10px"
      ></el-input>
      <buttonList
        v-bind:permissionArr="permissionArr"
        @buttonEvents="buttonEvents"
      ></buttonList>
     
        <span style="margin-left:15px">
          <el-radio v-model="page.type" label="1" @change="getValue()">{{$t('m.button.image')}}</el-radio>
          <el-radio v-model="page.type" label="2" @change="getValue()">{{$t('m.button.video')}}</el-radio>
        </span>
    </div>
    
    <div
       v-if="tableInfo.addVisible && tableInfo.updateVisible" id="tableComponent" class="refuseCopy"
    >
   
    <div v-if="page.type==1" style="height:100%;">
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

        <el-table-column
          align="center"
          :label="$t('m.label.picture')"
          prop="url"
        >
          <template slot-scope="scope">           
            <viewer>
	              <img :src="scope.row.url"  style="width: 50px; height: 50px"/>
	          </viewer>
          </template>
        </el-table-column>
      </el-table>
     
    </div>
     <!-- <div v-else>
        <div v-for="(v,i) in get_Material" :key="i">
           <video style="border-radius:8px;border:solid 1px #ccc;" height="130" width="234" :src="v.url" controls="controls"></video>
        </div>
    </div> -->
    <div v-if="page.type==2" style="height:100%;"
    >
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
        <el-table-column
          align="center"
          :label="$t('m.label.picture')"
          prop="url"
        >
          <template slot-scope="scope">
            <video
              style="border-radius: 8px; border: solid 1px #ccc"
              height="130"
              width="234"
              :src="scope.row.url"
              controls="controls"
            ></video>
          </template>
        </el-table-column>
      </el-table> 
    </div>
  </div>
    <labelTop
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
      :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    ></labelTop>
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
        label-width="82px"
        style="margin-left: 60px"
        class="form refuseCopy"
        :rules="rules"
        ref="addAction"
        size="small"
        label-position="left"
        :model="form"
      >
        <el-form-item>
          <el-upload
            class="pictureUpload"
            action="https://sports.mjktech.com.cn/material/insertMaterial"
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
            <el-button size="small" type="primary">{{
              $t("m.button.importFile")
            }}</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="comfirm">
            {{ $t("m.button.confirm") }}
          </el-button>
          <el-button type="danger" @click="cancel">
            {{ $t("m.button.cancel") }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import labelTop from "../../components/page/label";
// import tables from '../../components/table/table'
import buttonList from "../../components/table/button";
export default {
  name: "manage",
  components: {
    labelTop,
    // tables,
    buttonList,
  },
  data() {
    return {
      getRowKey(row) {
        //
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
      studentPhoto: [], //学生照片
      permissionArr: [],
      tableInfo: {
        //当前组件向子组件table 传值
        addVisible: true, //添加框控制器
        updateVisible: true, //修改框控制器
        currentPage: 1,
        pageSize: 20,
        get: "get_Material", //vuex中获取当前table列表的getter函数
      },
      form: {
        files: "",
      },
      page: {
        pageNum: 1,
        pageSize: 20,
        originalName: "",
        name: "",
        type:'1',
        total: 0,
      },
     
      header: {
        Authorization: localStorage.getItem("token"),
      },
      fileList: [],
      switchStatus: false,
      form: {},
    };
  },
  computed: {
    getInfo() {
      // 获取当前路由需要展示的信息table表
      if (this.tableInfo.get) {
        return this.$store.getters[this.tableInfo.get];
      }
    },
    ...mapGetters(["get_Material"]),
    // getCatalogue() {
    //   return JSON.parse(localStorage.getItem('catalogue'));
    // }
  },
  mounted() {
    this.$store.dispatch("getMaterial", this.page);
    this.permissionArr = this.$route.meta.arr;
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
   getValue(){
      console.log(this.page.type); // 打印的值，就是被选中的radio的值，1,2  
      if(this.page.type==1){
         this.$store.dispatch("getMaterial", this.page);
      }else if(this.page.type==2){
        this.$store.dispatch("getMaterial", this.page);
      }
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
        this.$store.dispatch("deleteMaterial", arr).then((res) => {});
      } else {
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch("getMaterial", this.page);
    },
    comfirm() {
      this.$store.dispatch("getMaterial", this.page);
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
.pictureUpload {
  display: inline-block;
  margin-left: 25px;
}
</style>