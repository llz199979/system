<!-- 系统管理/账号管理 -->
<template>
  <div class="height_100 eg1">
    <div class="buttonGroup" v-if="addVisible && updateVisible">
      <el-input
        size="small"
        v-model="page.name"
        @keydown.enter.native="selectName"
        clearable
        @clear="selectName"
        :placeholder="$t('m.placeholder.clockName')"
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
      :data="get_Clock.records"
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
        :label="$t('m.label.clockName')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="peopleName"
        :label="$t('m.label.numberMan')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        prop="periodId"
        :label="$t('m.label.shift')"
      >
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        :label="$t('m.label.attendanceTime')"
        prop="checkTime"
        width=""
      >
      </el-table-column>
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
     style="height: 200%"
    >
      <div slot="header" class="clearfix">
        <span
          class="cardHeader"
          v-text="
            addVisible ? $t('m.header.infoUpdate') : $t('m.header.newClock')
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
        :model="clock"
        label-width="108px"
      >
        <el-form-item :label="$t('m.label.clockArrName')" prop="name">
          <el-input
            clearable
            v-model="clock.name"
            class="input_260"
            autocomplete="off"
            :placeholder="$t('m.placeholder.clockName')"
          />
        </el-form-item>
         <el-form-item :label="$t('m.label.clockPeople')" prop="peopleNum" v-if="updateVisible==true">
             <el-select class="input_260"
             v-model="clock.peopleNum" multiple :placeholder="$t('m.placeholder.clockPeople')">
          <el-option  
            v-for="item in getPersonal"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item :label="$t('m.label.clockPeople')" prop="peopleNum" v-else>
             <el-select class="input_260"
             v-model="clock.peopleNum" multiple :placeholder="$t('m.placeholder.clockPeople')">
          <el-option  
            v-for="item in get_RosterList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item :label="$t('m.label.shift')" prop="periodId">
          <el-select class="input_260"
         v-model="clock.periodId" :placeholder="$t('m.placeholder.shiftName')">
          <el-option  
            v-for="item in getPeriod"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        </el-form-item>
         <el-form-item :label="$t('m.label.workDate')" prop="checkTime">
        <!-- <div class="canlendar">
           <el-calendar style="width: 54%;height: 412px;" v-model="clock.checkTime">
              <template
                slot="dateCell"
                slot-scope="{date, data}">
               
                <p :class="data.isSelected ? 'is-selected' : ''">
                  <div @click="check(date,data)">
                  {{ data.day.split('-').slice(1).join('-') }} 
                  {{ data.isSelected? '✔️' : '休'}}
                  <p v-if="!selectedDates.includes(data.day)">休息</p>
                  <p v-if="selectedDates.includes(data.day)">✔️</p>
                  </div>
                </p>
              
              </template>
           </el-calendar>
        </div> -->
         <el-date-picker
         class="input_260"
          type="dates"
          v-model="clock.checkTime"
          value-format="yyyy-MM-dd"
          :placeholder="$t('m.placeholder.punTime')">
        </el-date-picker>
         </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="addAction('addAction', clock)">
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
import { stringify } from 'querystring';
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
    //  let generateData = _ => {
    //     let data = [];
    //     let date = this.$store.getters.getPersonal;
    //     // const pinyin = ['shanghai', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
    //     date.forEach((name, id) => {
    //       data.push({
    //         label: name,
    //         key: id,
    //         // pinyin: pinyin[index]
    //       });
    //     });
    //     return data;
    //   };
    return {
    //   data: generateData(),
    //     filterMethod(query, item) {
    //       return item.name.indexOf(query) > -1;
    //     },
      addVisible: true, //添加框控制器
      updateVisible: true, //修改框控制器
      detailVisible:false,
      selectVisible:false,
      expands: [],
      // selectedDates:[],
      selection: [], //选中的条目
      getRowKey(row) {
        //
        return row.id;
      },
      value: "",
      page: {
        currentPage: 1,
        pageSize: 20,
        total: 0,
        name: '',
        id:'',
        peopleNum:'',
        periodId:'',
        checkTime:'',
        rosterId:''
      },
      permissionArr: [],
      switchStatus: false,
      clock: {
        personals:{}
      },
      // dates:'',
      //   resDate: [
      //           {"date":"2020-10-19","content":"班"},
      //            {"date":"2020-10-20","content":"班"},
      //         //  {"week":"周二","content":"班"},
      //         //  {"week":"周三","content":"班"},
      //         //  {"week":"周四","content":"班"},
      //         //  {"week":"周五","content":"班"},
      //         //  {"week":"周六","content":"休"},
      //         //  {"week":"周日","content":"休"},
      //       ]
    };
  },
  computed: {
    ...mapGetters(["get_Clock",'getPeriod','getPersonal','get_RosterList']),
    getPersonal() {
      return this.$store.getters.getPersonal;
    },
    getCatalogue() {
      return JSON.parse(localStorage.getItem("catalogue"));
    },
  },
  created() {
    this.$store.dispatch("getClockList", this.page);
    this.$store.dispatch("getPeriodList");
     this.$store.dispatch("getPersonalAll");
    this.permissionArr = this.$route.meta.arr; 
  },
  methods: {
    // check(val,data){
    //    console.log(val,data)
    //    this.selectedDates.push(data.day);
    //    console.log(this.selectedDates)
    // },
    
     dealMyDate(v) {
            console.log(v)
            let len = this.resDate.length
            let res = ""
            for(let i=0; i<len; i++){
                if(this.resDate[i].date == v) {
                    res = this.resDate[i].content
                    break
                }
            }
            return res
        },
         updateAssign(value) {      
      this.detailVisible = true; 
       
    },
    selectAssign(value) {      
      this.selectVisible = true;  
    },
    select(selection, row) {
      // 单选
      this.selection = selection;
      console.log(this.selection);
      // this.page.id = this.page.rosterId
    },
    selectAll(selection) {
      // 多选
      // console.log(selection)
      this.selection = selection;
      console.log(this.selection);
      
    },
    dblclick(row, cloumn, event) {},
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
    addAction(formRef, clock) {
			this.$refs[formRef].validate(valid => {
				if(valid) {
          if(this.updateVisible){
            this.$store.dispatch('addClock', clock)
            .then(res => {
              if(!this.switchStatus) {
                this.addVisible = true;
              }
              this.$store.dispatch('getClockList', this.page);
              this.clock = {};
            })
          }else{
            this.$store.dispatch('updateClock', clock)
            .then(res => {
              // this.selection = [];
              this.clock = {};
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
        this.$store.dispatch("deleteClock",arr).then((res) => {
           
        });
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
        // console.log(this.selection);
        this.updateVisible = false;
        this.clock = this.selection[0];     
        this.page.rosterId = this.selection[0].id
        this.$store.dispatch("getPersonalByRosterId",this.page)
       this.clock.checkTime = this.clock.checkTime.split(',')
       
      } else {
        let local = this.$i18n.locale;
         this.$notify.warning({
          title: local==='en'?'Error prompt':local==='zh'?'错误提示':'エラーメッセージ',
          message: local==='en'?'Please select at least one message':local==='zh'?'请至少选择一条信息':'メッセージを少なくとも一つ選んでください。'
        });
      }
    },
    selectName() {
      this.$store.dispatch("getClockList", this.page);
    },

    cancle() {
      if (!this.updateVisible) {
        this.clock = {};
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
 .is-selected {
    color: #1989FA;
  }
  .canlendar /deep/ .el-calendar-table .el-calendar-day{
    height: 47px;
  }
  .canlendar /deep/ .el-calendar-table thead th {
    padding: 10px 17px;
    color: #606266;
    font-weight: normal;
}

</style>