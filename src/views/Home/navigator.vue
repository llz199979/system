<!-- 首页内容main -->
<template>
  <div class="height_100 attendance">
    <div
      class="buttonGroup"
      v-if="tableInfo.addVisible && tableInfo.updateVisible"
    >
      <!-- 公司名称查询 -->
      <!-- <el-input size="small" v-model="page.corporationName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.corporation')"
      style="width:170px;margin-right:10px;"></el-input>-->
      <!-- 部门名称查询 -->
      <!-- <el-input size="small" v-model="page.departmentName"
      @keydown.enter.native="selectName" clearable
      @clear="selectName" :placeholder="$t('m.placeholder.department')"
      style="width:170px;margin-right:10px;"></el-input>-->
      <!-- {{permissionArr}} -->
      <span style="display: inline-block; margin-right: 10px">
        <!-- 姓名查询 -->
        <!-- <el-input
          size="small"
          v-model="page.name"
          @keydown.enter.native="selectName"
          clearable
          @clear="selectName"
          :placeholder="$t('m.placeholder.name')"
          style="width:170px;"
        ></el-input> -->
      </span>
      <!-- 日期选择 -->
      <!-- <el-date-picker
        size="small"
        v-model="date"
        @change="dateChange"
        style="width: 350px; margin-right: 10px"
        format="yyyy-MM-dd HH:mm:ss"
        value-format="yyyy-MM-dd HH:mm:ss"
        type="datetimerange"
        range-separator="至"
        :start-placeholder="$t('m.placeholder.startTime')"
        :end-placeholder="$t('m.placeholder.endTime')"
      ></el-date-picker> -->
      <!-- 查询按钮 -->
      <!-- <el-button @click="selectByTime" size="small">
        <i class="el-icon-search"></i>
        {{ $t("m.button.select") }}
      </el-button> -->

      <!-- 导出excel -->
      <!-- <buttonList v-bind:permissionArr="permissionArr" @buttonEvents="buttonEvents"></buttonList>
		<el-button style="margin-left:10px" type="success" @click="downloadExcel" size="small">
			<i class="el-icon-download"></i>
      {{$t('m.button.export')}}</el-button>-->
    </div>
    <!-- <div class="height_100 navigator">
      <ul class="flexCake flexCake_2"> -->
      
        <!-- <div id="main" style="width: 550px; height: 350px"></div> -->
         <div style="width:100%">
         <div id="line" style="width: 870px; height: 550px;margin:50px"></div>
         </div>
         <div style="width:100%">
         <div id="monthLine" style="width:870px;height:550px;margin:50px"></div>
         </div>
        <!-- <li>
          <div class="kefu" style="display: block;">
            <div class="round"></div>
            <div class="img">
              <div class="img_fff"></div>
            </div>
          </div>
        </li> -->
   
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import labelTop from "../../components/page/label";
import tables from "../../components/table/table";
var padaDate = function (value) {
  return value < 10 ? "0" + value : value;
};
export default {
  name: "temp1",
  components: {
    labelTop,
    tables,
  },
  data() {
    return {
      msg: "temp1",
      chartPie: "",
      typeName: [], //类型名称
      typeNum: [], //类型数量
      res: [],
      list: [],
      lineDay: [],
      lineNomal: [],
      lineAbnormal: [],
      lineMonth:[],
      monthNomal:[],
      monthAbnormal:[],
      lineEday:[],
      lineJday:[],
      ListChartsData: "",
      code: "",
      report_info: {},
      date: new Date(),

      addVisible: true, //添加框控制器
      updateVisible: true, //修改框控制器
      expands: [],
      selection: [], //选中的条目
      permissionArr: [],
      monthPush:[],
      // getRowKey(row) {      //
      //     return row.id;
      // },
      tableInfo: {
        //当前组件向子组件table 传值
        addVisible: true, //添加框控制器
        updateVisible: true, //修改框控制器
        currentPage: 1,
        pageSize: 20,
        // add: 'addAction',
        // update: 'updatecorporation',
        // delete: 'deleteAction',
        get: "get_AttendanceList", //vuex中获取当前table列表的getter函数
      },
      date: "",
      page: {
        currentPage: 1,
        pageSize: 20,
        total: 0,
        name: "",
        // corpId: '',
        corporationName: "",
        departmentName: "",
        startTime: "",
        endTime: "",
      },
      form: {},
    };
  },
  methods: {
    // 周的折线图
    drawLine() {
      // 折线表
      let myLine = this.$echarts.init(document.getElementById("line"));
      //let res= this.$store.getters.get_LineWeek;

      this.$store.dispatch("getLineWeek").then((res) => {
        let val = res;
        var dayTemp = [];
        var nomalTemp = [];
        var abnomalTemp = [];
        var edayTemp = [];
        var jdayTemp =[];
        var list = [];
        for (var i = 0; i < val.length; i++) {
          if (val[i].whichDay !== "") {
            dayTemp.push(val[i].whichDay);

            // console.log('AAA：'+item[i].whichDay);
            if (val[i].normal !== "") {
              nomalTemp.push(val[i].normal);
            }
            if (val[i].abnormal !== "") {
              abnomalTemp.push(val[i].abnormal);
            }
             if (val[i].normalEnglishName !== "") {
              edayTemp.push(val[i].normalEnglishName);
            }
             if (val[i].normalJapanName !== "") {
            jdayTemp.push(val[i].normalJapanName);
             }

            if (dayTemp.length > 0) {
              this.lineDay = dayTemp;
            }
            if (nomalTemp.length > 0) {
              this.lineNomal = nomalTemp;
            }
            if (abnomalTemp.length > 0) {
              this.lineAbnormal = abnomalTemp;
            }
             if (edayTemp.length > 0) {
              this.lineEday = edayTemp;
            }
             if (jdayTemp.length > 0) {
              this.lineJday = jdayTemp;
            }
          }
        }
        // 折线图
        myLine.setOption({
          title: { text:this.$i18n.locale === 'en'?'Weekly Clock Temperature System':this.$i18n.locale === 'zh'? "周打卡温度统计":"毎週のクロッキング温度統計"},
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [this.$i18n.locale === 'en'?'The temperature is normal':this.$i18n.locale === 'zh'? "体温正常":"通常の体温", this.$i18n.locale === 'en'?'Abnormal body temperature':this.$i18n.locale === 'zh'? "体温异常":"異常な体温"], right: '1%'
          },
          grid: {
            left: "8%",
            right: "8%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
             top:"3%",
            feature: {
              saveAsImage: {},
             
            },
          },

          xAxis: {
            type: "category", // 还有其他的type，可以去官网喵两眼哦title: { text: this.$i18n.locale === 'zh'?this.lineMonth:this.monthNomal },
            boundaryGap: false,
            data: this.$i18n.locale === 'en'?this.lineEday.reverse():this.$i18n.locale === 'zh'? this.lineDay.reverse():this.lineJday.reverse(),
            name: this.$i18n.locale === 'en'?'week':this.$i18n.locale === 'zh'? "星期":"週間", // x轴名称
            // x轴名称样式
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18,
            },
          },
          yAxis: {
            type: "value",
            name: this.$i18n.locale === 'en'?'temperature':this.$i18n.locale === 'zh'? "温度":"通常の体温", // y轴名称
            // y轴名称样式
            //  data: this.lineNomal,
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18,
            },
          },
          series: [
            {
              name: this.$i18n.locale === 'en'?'The temperature is normal':this.$i18n.locale === 'zh'? "体温正常":"通常の体温",
              type: "line",
              stack: "",
              data: this.lineNomal,
            },
            {
              name: this.$i18n.locale === 'en'?'Abnormal body temperature':this.$i18n.locale === 'zh'? "体温异常":"異常な体温",
              stack: "",
              type: "line",
              data: this.lineAbnormal,
            },
          ],
        });
      });
    },
// 月份折线图

   monthLine(){
      // 折线表
    let myMonthLine = this.$echarts.init(document.getElementById("monthLine"));
     this.$store.dispatch("getLineMonth").then(res=>{     
        let val = res;
        let dayTemp = [];
        let nomalTemp = [];
        let abnomalTemp = [];
        let list = [];
        for (var i = 0; i < val.length; i++) {
          if (val[i].whichDay !== "") {
            dayTemp.push(val[i].whichDay);

            // console.log('AAA：'+item[i].whichDay);
            if (val[i].normal !== "") {
              nomalTemp.push(val[i].normal);
            }
            if (val[i].abnormal !== "") {
              abnomalTemp.push(val[i].abnormal);
            }

            if (dayTemp.length > 0) {
              this.lineMonth = dayTemp;
            }
            if (nomalTemp.length > 0) {
              this.monthNomal = nomalTemp;
            }
            if (abnomalTemp.length > 0) {
              this.monthAbnormal = abnomalTemp;
            }
          }
        }
        // 折线图
        myMonthLine.setOption({
          title: { text:this.$i18n.locale === 'en'?'Monthly clock in temperature statistics':this.$i18n.locale === 'zh'? "月打卡温度统计":"毎月のクロッキング温度統計" },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: [this.$i18n.locale === 'en'?'The temperature is normal':this.$i18n.locale === 'zh'? "体温正常":"通常の体温", this.$i18n.locale === 'en'?'Abnormal body temperature':this.$i18n.locale === 'zh'? "体温异常":"異常な体温"],right: '1%'
          },
          grid: {
            left: "8%",
            right: "10%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
             top:"3%",
            feature: {
              saveAsImage: {},
            },
          },

          xAxis: {
            type: "category", // 还有其他的type，可以去官网喵两眼哦
            boundaryGap: false,
            data: this.lineMonth.reverse(),
            name: this.$i18n.locale === 'en'?'date':this.$i18n.locale === 'zh'? "日期":"日付", // x轴名称
            // x轴名称样式
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18,
            },
          },
          yAxis: {
            type: "value",
            name: this.$i18n.locale === 'en'?'temperature':this.$i18n.locale === 'zh'? "温度":"通常の体温", // y轴名称
            // y轴名称样式
            //  data: this.lineNomal,
            nameTextStyle: {
              fontWeight: 600,
              fontSize: 18,
            },
          },
          series: [
            {
              name:this.$i18n.locale === 'en'?'The temperature is normal':this.$i18n.locale === 'zh'? "体温正常":"通常の体温",
              type: "line",
              stack: "",
              data: this.monthNomal,
            },
            {
              name:this.$i18n.locale === 'en'?'Abnormal body temperature':this.$i18n.locale === 'zh'? "体温异常":"異常な体温",
              stack: "",
              type: "line",
              data: this.monthAbnormal,
            },
          ],
        });
      });
    },


    select(selection) {
      // 单选    子组件table => 父组件传值
      this.selection = selection;
    },
    selectAll(selection) {
      // 多选 子组件table => 父组件传值
      // console.log(selection)
      this.selection = selection;
    },
    dblclick(row, cloumn, event) {},
    dateChange(v) {
      if (v) {
        this.page.startTime = v[0];
        this.page.endTime = v[1];
      } else {
        this.page.startTime = "";
        this.page.endTime = "";
      }
      this.selectByTime();
    },
    sizeChange(val) {
      this.page.pageSize = val;
      this.tableInfo.pageSize = val;
      this.selectName();
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
    selectByTime() {
      var titleTemp = [];
      var resultTemp = [];
      var list = [];
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("main"));
      this.$store.dispatch("getECharts", this.page).then((res) => {
        //将值继续复制给报表
        var result = JSON.stringify(res.data.data);
        var item = eval(result);
        for (var i = 0; i < item.length; i++) {
          if (item[i].name !== "") {
            titleTemp.push(item[i].name);

            // console.log('AAA：'+item[i].name);
            if (item[i].name !== "" && item[i].value !== "") {
              var objtmp = {
                value: item[i].value,
                name: item[i].name,
              };
              resultTemp.push(objtmp);
            }

            if (titleTemp.length > 0) {
              this.typeName = titleTemp;
            }
            if (resultTemp.length > 0) {
              this.typeNum = resultTemp;
              //  console.log('结果：'+this.typeNum);
            }
          }
        }

        myChart.setOption({
          title: {text: "出勤详情", left: "110" },
          legend: {
            type: "scroll",
            orient: "vertical",
            left: 0,
            top: 50,
            bottom: 10,
            data: this.typeName,
          },
          series: {
            type: "pie",
            radius: "65%",
            center: ["40%", "60%"],
            data: this.typeNum,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  formatter: "{b} : {c} ({d}%)",
                },
                labelLine: { show: true },
              },
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        });
      });
    },

    updateAction() {
      if (this.selection.length == 1) {
        this.tableInfo.updateVisible = false;
        this.form = JSON.parse(JSON.stringify(this.selection[0]));
        // this.corporation.id = this.user.id;
      } else {
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch("getECharts", this.page);
      this.$store.dispatch("getLineWeek");
    },
  },

  computed: {
    get_activeIndex() {
      return this.$store.getters.get_activeIndex;
    },
    ...mapGetters([
      // "get_CorporationList",
      // 'get_AttendanceList'
      // "get_DepartmentList",
      // 'get_Userlist'
    ]),
  },
  mounted() {
    // this.initData();
    // this.drawCharts();
    this.drawLine();
    this.monthLine();
    // this.selectByTime();
    this.permissionArr = this.$route.meta.arr;
    // this.$store.dispatch("getECharts", this.page);

    // this.$store.dispatch("getLineWeek").then(res=>{
    //       console.log('3333====>'+res);
    // });
  },
};
</script>

<style lang="scss" scoped>
// @import url('../../assets/css/button.scss');
.attendance {
  margin: 0 8px;
  text-align: left;

  /* background:#ffa5a5; */
}
#main {
  margin-top: 20px;
  // position: absolute;
  left: -30px;
}
#tableComponent[data-v-286c41ed] {
  height: calc(150% - 70px);
  margin-bottom: 6px;
}
.height_100 {
  height: 40%;
}
.input_260 {
  width: 260px;
}
.navigator {
  /* padding:8px; */
  /* margin:8px; */
  // box-shadow: 0 0 4px #ccc;
  // background:#f0f2f5;
  height: 310px;
  width: 100%;
  .flexCake {
    height: 230px;
    width: 100%;
    // border:solid 1px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    & > li {
      background: #fff;
      margin: 10px;
      padding: 20px 0;
      top: 0;
      transition: all 0.5s ease-in-out;
    }
  }
  .flexCake_2 {
    height: 250px;
  }
  .flexCake_3 {
    height: 260px;
    width: 100%;
    // border:solid 1px;
    padding: 10px;
    display: flex;
    // justify-content: space-around;
    & > li {
      // flex:1;
      background: #fff;
      padding: 20px 0;

      // margin:6px;
    }
    & > li:nth-child(1) {
      flex: 2;
      padding: 20px 10px;
    }
    & > li:nth-child(2) {
      flex: 1;
      margin-left: 20px;
    }
  }
}
.kefu {
  width: 120px;
  height: 120px;
  position: fixed;
  z-index: 50;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
}
.kefu .img {
  width: 86px;
  height: 86px;
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-left: -43px;
  margin-top: -43px;
  background-color: #baedcd;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
}
.kefu .img_fff {
  width: 66px;
  height: 66px;
  position: absolute;
  display: block;
  left: 50%;
  top: 50%;
  margin-left: -33px;
  margin-top: -33px;
  background-color: #fff;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
}
.round {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #baedcd;
  text-align: center;
  -webkit-transform-origin: 50% 50%;
  transform-origin: 50% 50%;
  -webkit-animation-name: mymove;
  animation-name: mymove;
  -webkit-animation-duration: 1.5s;
  animation-duration: 1.5s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}

@keyframes mymove {
  0% {
    -webkit-transform: scale(0.5);
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  75% {
    opacity: 0.85;
  }

  100% {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
    opacity: 0;
  }
}
</style>