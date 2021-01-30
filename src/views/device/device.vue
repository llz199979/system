<!-- 设备管理/设备管理 -->
<template>
  <div class="height_100 eg1">
    <div
      class="buttonGroup"
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
    >
      <!-- {{permissionArr}} -->
      <el-input
        v-show="permissionArr.includes('view')"
        size="small"
        v-model="page.nameOrMacId"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        :placeholder="$t('m.placeholder.nameOrMac')"
        style="width: 180px; margin-right: 10px"
      ></el-input>
      <buttonList
        v-bind:permissionArr="permissionArr"
        @buttonEvents="buttonEvents"
      ></buttonList>
    </div>
    <div
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
      id="tableComponent"
      class="refuseCopy"
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
          prop="name"
          :label="$t('m.label.deviceName')"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="macId"
          :label="$t('m.label.macAddress')"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="equipmentDesc"
          :label="$t('m.label.description')"
        >
        </el-table-column>
        <el-table-column
          align="center"
          show-overflow-tooltip
          prop="status"
          :label="$t('m.label.status')"
        >
          <template slot-scope="scope">
            {{ scope.row.status == "true" ? "在线" : "离线" }}
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
              {{ $t("m.button.setup") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        v-el-drag-dialog
        custom-class="dialog"
        width="550px"
        top="10vh"
        :modal="false"
        :visible.sync="detailVisible"
        center
        :title="$t('m.button.setup')"
      >
        <el-form
          style="margin-left: 50px"
          class="form refuseCopy"
          size="small"
          label-position="left"
          :rules="rules"
          ref="onSubmit"
          :model="form"
          label-width="160px"
        >
          <el-form-item :label="$t('m.label.alarmTemp')" prop="alarmTemp">
            <el-input v-model="form.alarmTemp"></el-input>
          </el-form-item>
          <el-form-item :label="$t('m.label.roomTemp')" prop="roomTemp">
            <el-input v-model="form.roomTemp"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.detectionMode')"
            prop="detectionMode"
          >
            <el-select
              v-model="form.detectionMode"
              :placeholder="$t('m.placeholder.model')"
            >
              <el-option :label="$t('m.label.accurate')" value="0"></el-option>
              <el-option :label="$t('m.label.standard')" value="1"></el-option>
              <el-option :label="$t('m.label.fast')" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.highTempMeasurementTimes')"
            prop="highTempMeasurementTimes"
          >
            <el-input v-model="form.highTempMeasurementTimes"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.highTemperatureAlarm')"
            prop="highTemperatureAlarm"
          >
            <el-switch v-model="form.highTemperatureAlarm"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('m.label.showHighTemp')" prop="showHighTemp">
            <el-switch v-model="form.showHighTemp"></el-switch>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.informationShowTime')"
            prop="informationShowTime"
          >
            <el-input v-model="form.informationShowTime"></el-input>
          </el-form-item>
          <el-form-item :label="$t('m.label.sleepTime')" prop="sleepTime">
            <el-input v-model="form.sleepTime"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.sensingDistance')"
            prop="sensingDistance"
          >
            <el-input v-model="form.sensingDistance"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.binocularCamera')"
            prop="binocularCamera"
          >
            <el-switch v-model="form.binocularCamera"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('m.label.visitorsOpen')" prop="visitorsOpen">
            <el-switch v-model="form.visitorsOpen"></el-switch>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.supportVisitor')"
            prop="supportVisitor"
          >
            <el-switch v-model="form.supportVisitor"></el-switch>
          </el-form-item>
          <el-form-item
            :label="$t('m.label.openManagerPassword')"
            prop="openManagerPassword"
          >
            <el-switch v-model="form.openManagerPassword"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('m.label.screenSaver')" prop="screenSaver">
            <el-switch v-model="form.screenSaver"></el-switch>
          </el-form-item>
          <el-form-item :label="$t('m.label.maskFunction')" prop="maskFunction">
            <el-switch v-model="form.maskFunction"></el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('onSubmit', form)">
              {{ $t("m.button.confirm") }}</el-button
            >
            <el-button type="danger" @click="upsetCancel">
              {{ $t("m.button.cancel") }}
            </el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
    <labelTop
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
      :label-info="page"
      @sizeChange="sizeChange"
      @currentChange="currentChange"
    ></labelTop>

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
              : $t('m.header.deviceAdd')
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
        style="margin-left: 60px"
        class="form refuseCopy"
        :rules="rules"
        ref="addAction"
        size="small"
        label-position="left"
        :model="device"
        label-width="88px"
      >
        <el-form-item :label="$t('m.label.deviceName')" prop="name">
          <el-input
            clearable
            v-model="device.name"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.macAddress')" prop="macId">
          <el-input
            clearable
            v-model="device.macId"
            class="input_260"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item :label="$t('m.label.description')" prop="equipmentDesc">
          <el-input
            clearable
            v-model="device.equipmentDesc"
            class="input_260"
            autocomplete="off"
            @keydown.native.enter="addAction('addAction', device)"
          />
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="addAction('addAction', device)">
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
  name: "eg1",
  components: {
    labelTop, // 分页组件
    // tables,                 // el-table组件
    buttonList, // 按钮组件
  },
  data() {
    return {
      addVisible: true, // 添加框控制器
      updateVisible: true, // 修改框控制器
      detailVisible: false, //设置
      expands: [],
      selection: [], // 选中的条目
      getRowKey(row) {
        // 隐藏栏id设置(不能唯一)
        return row.id;
      },

      permissionArr: [],
      tableInfo: {
        // 父组件向子组件传值
        addVisible: true, // 添加框控制器
        updateVisible: true, // 修改框控制器
        currentPage: 1,
        pageSize: 20,

        get: "get_DeviceList", // 将当前路由的getters函数传递过去，使之展示
      },
      page: {
        currentPage: 1,
        pageSize: 20,
        roleName: "",
        total: 0,
        nameOrMacId: "",
        status: "",
      },
      switchStatus: false,
      device: {},

      form: {
        id: "",
        alarmTemp: 37.3, //报警温度
        binocularCamera: false, //是否开启双目摄像头
        sensingDistance: 60, //传感器距离 cm
        sleepTime: 180, // 休眠时间 Second
        roomTemp: 26, //室内温度
        informationShowTime: 10, //考勤信息展示时间 Second
        highTempMeasurementTimes: 2, //高温判读次数， 如次数2，则判断连续两次测得高温才判定为真的高温
        visitorsOpen: false, // 访客开门开关
        supportVisitor: false, //访客记录开关
        openManagerPassword: false, //管理界面密码开关
        screenSaver: false, //是否开启屏保
        highTemperatureAlarm: true, //是否开启高温警报
        showHighTemp: true, //是否开启高温温度显示
        maskFunction: false, //是否开启口罩功能
        detectionMode: "1", //测温模式 0：精准 1：标准 2：快速
      },
    };
  },
  computed: {
    getInfo() {
      // 获取当前路由需要展示的信息table表
      if (this.tableInfo.get) {
        return this.$store.getters[this.tableInfo.get];
      }
    },
    ...mapGetters(["get_DeviceList", "get_Userlist"]),
    // get_RoleList() {
    //   return this.$store.getters.get_RoleList;
    // }
    getCatalogue() {
      return JSON.parse(localStorage.getItem("catalogue"));
    },
  },
  mounted() {
    // this.$store.dispatch('getUserListPage', this.page);
    // let arr = JSON.parse(localStorage.getItem('permissionArr'));
    // console.log(arr)
    this.$store.dispatch("getDeviceList", this.page);

    // this.$store.dispatch('getRoleList');
    this.permissionArr = this.$route.meta.arr;
    // console.log(this.$router)
  },
  methods: {
    select(selection) {
      // 单选
      this.selection = selection;
      console.log(this.selection);
    },
    selectAll(selection) {
      // 多选
      // console.log(selection)
      this.selection = selection;
      console.log(this.selection);
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
    table_index(index) {
      return (this.page.currentPage - 1) * this.page.pageSize + index + 1;
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName();
      console.log("sizeChange: " + val);
    },
    currentChange(val) {
      console.log("currentChage " + val);
      this.page.currentPage = val;
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
        case "update":
          this.updateAction();
          break;
        case "select":
          this.selectName();
          break;
      }
    },
    // 添加与修改
    addAction(form, device) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          console.log(device);
          if (this.tableInfo.updateVisible) {
            //账号添加、修改判别
            this.$store.dispatch("addDevice", device).then((res) => {
              console.log("addDeviceSuccess");
              this.device = {};
              if (!this.switchStatus) {
                this.tableInfo.addVisible = true;
              }
            });
          } else {
            this.$store.dispatch("updateDevice", device).then((res) => {
              this.device = {};
              this.tableInfo.updateVisible = true;
              // this.$store.dispatch('getUserListPage', this.page)
            });
          }
        } else {
          return false;
        }
      });
    },
    deleteAction() {
      if (this.selection.length) {
        console.log(this.selection);
        let arr = [];
        this.selection.forEach((v) => {
          arr.push(v.id); //隐式转换
        });
        this.$store.dispatch("deleteDevice", arr).then((res) => {});
      } else {
        let local = this.$i18n.locale;
        this.$notify.warning({
          title:
            local === "en"
              ? "Error prompt"
              : local === "zh"
              ? "错误提示"
              : "エラーメッセージ",
          message:
            local === "en"
              ? "Please select at least one message"
              : local === "zh"
              ? "请至少选择一条信息"
              : "メッセージを少なくとも一つ選んでください。",
        });
      }
    },
    updateAction() {
      if (this.selection.length == 1) {
        console.log(this.selection);
        this.tableInfo.updateVisible = false;
        // 从table列表中获取当前信息。
        this.device = JSON.parse(JSON.stringify(this.selection[0]));
        if (this.device.tenantId) {
          //后端问题,传这个参数报错
          delete this.device.tenantId;
        }
        console.log(this.selection);
        // this.device.id = this.user.id;
      } else {
        let local = this.$i18n.locale;
        this.$notify.warning({
          title:
            local === "en"
              ? "Error prompt"
              : local === "zh"
              ? "错误提示"
              : "エラーメッセージ",
          message:
            local === "en"
              ? "Please select at least one message"
              : local === "zh"
              ? "请至少选择一条信息"
              : "メッセージを少なくとも一つ選んでください。",
        });
      }
    },
    selectAssign(value) {
      //  console.log(value.id)
      // value.id = this.form;
      // console.log(this.form.id)

      this.detailVisible = true;
      this.form.id = { ...value }.id;
      // console.log({...value}.equipmentConf)
      // console.log(JSON.parse(value.equipmentConf))

      let val = JSON.parse(value.equipmentConf);
      console.log(val.supportVisitor);
      this.form.alarmTemp = val.alarmTemp;
      this.form.sensingDistance = val.sensingDistance;
      this.form.binocularCamera = val.binocularCamera == "false" ? false : true;
      this.form.detectionMode = val.detectionMode;
      this.form.highTempMeasurementTimes = val.highTempMeasurementTimes;
      this.form.highTemperatureAlarm =
        val.highTemperatureAlarm == "false" ? false : true;
      this.form.informationShowTime = val.informationShowTime;
      this.form.maskFunction = val.maskFunction == "false" ? false : true;
      this.form.openManagerPassword =
        val.openManagerPassword == "false" ? false : true;
      this.form.roomTemp = val.roomTemp;
      this.form.screenSaver = val.screenSaver == "false" ? false : true;
      this.form.showHighTemp = val.showHighTemp == "false" ? false : true;
      this.form.sleepTime = val.sleepTime;
      this.form.supportVisitor = val.supportVisitor == "false" ? false : true;
      this.form.visitorsOpen = val.visitorsOpen == "false" ? false : true;
    },
    selectName() {
      console.log(this.page);
      this.$store.dispatch("getDeviceList", this.page);
    },

    cancel() {
      if (!this.tableInfo.updateVisible) {
        this.device = {};
        this.selection = [];
      }
      this.tableInfo.addVisible = true;
      this.tableInfo.updateVisible = true;
    },
    //设置成功提交
    onSubmit(formRef, form) {
      this.$refs[formRef].validate((valid) => {
        if (valid) {
          this.$store.dispatch("setUpConfig", form).then((res) => {
            this.form = {};
            this.detailVisible = false;
          });
        } else {
          return false;
        }
      });
    },
    //设置取消
    upsetCancel() {
      this.detailVisible = false;
    },
  },
};
</script>

<style scoped>
#tableComponent {
  height: calc(100% - 70px);
  margin-bottom: 6px;
}
.eg1 {
  margin: 0 8px;
  text-align: left;

  /* background:#ffa5a5; */
}
.chest {
  width: 500px;
  height: 500px;
  margin: 0 auto;
  position: relative;
}
.heart {
  position: absolute;
  z-index: 2;
  background: linear-gradient(-90deg, #f50a45 0%, #d5093c 40%);
  animation: beat 2s ease 0s infinite normal;
}
.heart.center {
  background: linear-gradient(-45deg, #b80734 0%, #d5093c 40%);
}
.heart.top {
  z-index: 3;
}
.sided {
  top: 100px;
  width: 220px;
  height: 220px;
  border-radius: 110px;
}
.center {
  width: 210px;
  height: 210px;
  bottom: 100px;
  left: 145px;
  transform: rotateZ(225deg);
}
.left {
  left: 62px;
}
.right {
  right: 62px;
}
@keyframes beat {
  0% {
    transform: scale(1) rotate(225deg);
    box-shadow: 0 0 40px #d5093c;
  }
  50% {
    transform: scale(1.1) rotate(225deg);
    box-shadow: 0 0 70px #d5093c;
  }
  100% {
    transform: scale(1) rotate(225deg);
    box-shadow: 0 0 40px #d5093c;
  }
}
.input_260 {
  width: 260px;
}
</style>