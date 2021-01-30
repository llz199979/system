<!-- 班次管理 -->
<template>
  <div class="height_100 eg1">
    <div class="buttonGroup" v-if="addVisible && updateVisible">
      <el-input
        size="small"
        v-model="page.name"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        :placeholder="$t('m.placeholder.shiftName')"
        style="width: 180px; margin-right: 10px"
      ></el-input>
      <buttonList
        v-bind:permissionArr="$route.meta.arr"
        @buttonEvents="buttonEvents"
      ></buttonList>
    </div>

    <el-table
      v-if="addVisible && updateVisible"
      ref="multipleTable"
      :data="get_Shift.records"
      tooltip-effect="dark"
      height="calc(100% - 70px)"
      style="width: 100%; margin-bottom: 6px"
      :highlight-current-row="true"
      :row-key="getRowKey"
      :expand-row-keys="expands"
      @row-dblclick="dblclick"
      @select="select"
      @select-all="selectAll"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
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
        prop="name"
        :label="$t('m.label.shiftName')"
      >
      </el-table-column>
       <el-table-column
        align="center"
        show-overflow-tooltip
        prop="type"
        :label="$t('m.label.punchTimes')"
      >
           <template slot-scope="scope">
             {{scope.row.type==1?'一天一次':scope.row.type==2?'一天二次':'一天三次'}}
        </template>
      </el-table-column>
       <el-table-column
        align="center"
        show-overflow-tooltip
        prop="timeSum"
        :label="$t('m.label.attendanceTime')" 
      >      
      </el-table-column>
      <!-- <el-table-column
        align="center"
        show-overflow-tooltip
        :label="$t('m.label.attendanceTime')"
        prop="date"
        width=""
      >
        <template slot-scope="scope">{{
          scope.row.createTime.slice(0, 10)
        }}</template>
      </el-table-column> -->
    </el-table>
    <labelTop
      v-if="addVisible && updateVisible"
      :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    ></labelTop>
    <!-- {{get_RoleList}} -->
    <el-card
      v-show="!addVisible || !updateVisible"
      class="box-card"
      shadow="always"
      style="height: 120%"
    >
      <div slot="header" class="clearfix">
        <span
          class="cardHeader"
          v-text="
            addVisible ? $t('m.header.infoUpdate') : $t('m.header.newShift')
          "
        ></span>
        <el-switch
          v-if="!addVisible"
          style="float: right; font-size: 12px !important"
          active-color="#13ce66"
          inactive-color=""
          v-model="switchStatus"
          :active-text="$t('m.header.addContinue')"
        >
        </el-switch>
      </div>
      <el-form
        style="margin-left: 60px"
        class="form refuseCopy"
        :rules="rules"
        ref="addAction"
        size="small"
        label-position="left"
        :model="shift"
        label-width="150px"
      >
        <el-form-item :label="$t('m.label.shiftName')" prop="name">
          <el-input
            clearable
            v-model="shift.name"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.punchTimes')" prop="type">
         <el-select class="input_260"
         v-model="shift.type" :placeholder="$t('m.placeholder.punchTimes')">
          <el-option  
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.label.clockIn')" prop="chekckTime1">
          <el-time-picker
          class="input_260"
            is-range
            v-model="shift.chekckTime1"        
             value-format="HH:mm"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
             range-separator="—"
            placeholder="选择时间范围">
          </el-time-picker>
           </el-form-item>
           <el-form-item prop="chekckTime2">
         <el-time-picker
           v-if="shift.type==2 || shift.type==3"
          class="input_260"
            is-range
              v-model="shift.chekckTime2"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
           </el-form-item>
            <el-form-item prop="chekckTime3">
          <el-time-picker
           v-if="shift.type==3"
          class="input_260"
            is-range
               v-model="shift.chekckTime3"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
          </el-form-item>

           <el-checkbox v-model="shift.status" class="checkbox">{{$t('m.button.setting')}}</el-checkbox>
          <div v-if="shift.status==true">
        <el-form-item :label="$t('m.label.clockInRange1')" prop="workScope1">
          <el-time-picker
          class="input_260"
            is-range
            v-model="shift.workScope1"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
          </el-form-item>
           <el-form-item prop="workScope2">
          <el-time-picker
           v-if="shift.type==2 || shift.type==3"
          class="input_260"
            is-range
            v-model="shift.workScope2"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
          </el-form-item>
           <el-form-item prop="workScope3">
          <el-time-picker
           v-if="shift.type==3"
          class="input_260"
            is-range
            v-model="shift.workScope3"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>

        <el-form-item :label="$t('m.label.clockInRange2')" prop="scopeOffWork1">
          <el-time-picker
          class="input_260"
            is-range
            v-model="shift.scopeOffWork1"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
          </el-form-item>
          <el-form-item prop="scopeOffWork2">
          <el-time-picker
           v-if="shift.type==2 || shift.type==3"
          class="input_260"
            is-range
            v-model="shift.scopeOffWork2"
             value-format="HH:mm"
            range-separator="—"
            :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
          </el-form-item>
          <el-form-item prop="scopeOffWork3">
          <el-time-picker
           v-if="shift.type==3"
          class="input_260"
            is-range
            v-model="shift.scopeOffWork3"
             value-format="HH:mm"
            range-separator="—"
             :start-placeholder="$t('m.placeholder.startTime')"
            :end-placeholder="$t('m.placeholder.endTime')"
            placeholder="选择时间范围">
          </el-time-picker>
        </el-form-item>
        </div>
      
        <el-form-item label="">
          <el-button type="primary" @click="addAction('addAction', shift)">
            {{ $t("m.button.confirm") }}
          </el-button>
          <el-button type="danger" @click="cancle">
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
import buttonList from "../../components/table/button";
export default {
  name: "eg1",
  components: {
    labelTop,
    buttonList,
  },
  data() {
    return {
      isShow: true,
      addVisible: true, //添加框控制器
      updateVisible: true, //修改框控制器
      expands: [],
      selection: [], //选中的条目
      getRowKey(row) {
        //
        return row.id;
      },
       typeList:[{
         value:'1',
         label:'一天1次上下班'
      },
      {
        value:'2',
        label:'一天2次上下班'
      },
       {
        value:'3',
        label:'一天3次上下班'
      }
      ],
      value: "",
      page: {
        currentPage: 1,
        pageSize: 20,
        name: '',
        total: 0,
        rosterId:'',
        id:'',
        createTime:''
      },
      permissionArr: [],
      switchStatus: false,
      shift: {
        status:false
      },
    };
  },
  computed: {
    ...mapGetters(["get_Shift"]),
    // getInfo() { // 获取当前路由需要展示的信息table表
    //       if(this.tableInfo.get){
    //           return this.$store.getters[this.tableInfo.get];
    //       }
    //   },
    getCatalogue() {
      return JSON.parse(localStorage.getItem("catalogue"));
    },
  },
  mounted() {
    this.$store.dispatch("getShiftList", this.page);
    this.permissionArr = this.$route.meta.arr;
  },
  methods: {
    select(selection, row) {
      this.selection = selection;
    },
    selectAll(selection) {
      // 多选
      // console.log(selection)
      this.selection = selection;
    },
    dblclick(row, cloumn, event) {
    },
    //翻页后序号连续
    table_index(index) {
      return (this.page.currentPage - 1) * this.page.pageSize + index + 1;
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.selectName();
      console.log("sizeChange: " + val);
    },
    currentChange(val) {
      console.log("currentChage " + val);
      this.page.currentPage = val;
      this.selectName();
    },
    buttonEvents(operation) {
      switch (operation) {
        case "add":
          this.addVisible = false;
          break;
        case "delete":
          this.deleteAction();
          break;
        case "update":
          this.updateAction();
          break;
        case "select":
          this.selectName();
          break;
      }
    },
    // 添加与修改
    addAction(formRef, shift) {
			this.$refs[formRef].validate(valid => {
				if(valid) {
          if(this.updateVisible){
            this.$store.dispatch('addShift', shift)
            .then(res => {
              if(!this.switchStatus) {
                this.addVisible = true;
              }
              this.$store.dispatch('getShiftList', this.page);
              this.shift = {};
            })
          }else{
            this.$store.dispatch('updateShift', shift)
            .then(res => {
              this.selection = [];
              this.shift = {};
              this.updateVisible = true;
            })
          }
				}else{
					return false;
				}
			})
    },
    deleteAction() {
      if (this.selection.length) {
         let arr =[];
          this.selection.forEach(v => {
          arr.push(v.id);  
        })
        // let id = this.selection[0].id;
        this.$store.dispatch("deleteShift", arr).then((res) => {});
      } else {
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    updateAction() {
      if (this.selection.length == 1) {
        console.log(this.selection);
        this.updateVisible = false;
        this.shift = this.selection[0];
        this.shift.id = this.shift.id;
      } else {
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch("getShiftList", this.page);
    },

    cancle() {
      if (!this.updateVisible) {
        this.shift = {};
        this.selection = [];
      }
      this.addVisible = true;
      this.updateVisible = true;
    },
  },
};
</script>

<style scoped>
#tableComponent {
  /* height:calc(100% - 70px); */
  margin-bottom: 6px;
}
.eg1 {
  margin: 0 8px;
  text-align: left;
  /* background:#ffa5a5; */
}
.input_260 {
  width: 260px;
}
.checkbox{
  padding-bottom: 15px;
}
</style>