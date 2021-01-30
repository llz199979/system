// 考勤管理导出excel
import fx from '../../utils/fx'
import api from '../../utils/api'
import { setItem, getItem, removeItem } from '../../utils/token'
import axios from 'axios'
import JSONbig from 'json-bigint'
const attendence = {
  state: {
    attendanceList: {} ,   //考勤列表
    shiftList:[],
    clockList:[],
    periodList:[],
    personalList:[],
    weekList:[],
    monthList:[],
    rosterList:[],
    recordList:[],
    checkArrList:[],
    checkEchart:[]
  },
  getters: {
    get_AttendanceList: state => state.attendanceList,
    get_Shift: state => state.shiftList,
    get_Clock: state => state.clockList,
    getPeriod: state => state.periodList,
    getPersonal: state => state.personalList,
    get_LineWeek: state => state.weekList,
    get_LineMonth: state => state.monthList,
    get_RosterList: state => state.rosterList,
    get_recordList: state => state.recordList,
    get_checkArr: state => state.checkArrList,
    get_CheckEchart: state => state.checkEchart,
  },
  mutations: {
    set_GetAttendanceList: (state, data) => state.attendanceList = data,
    set_ShiftList: (state, data) => state.shiftList = data,
    set_ClockList: (state, data) => state.clockList = data,
    set_periodList: (state, data) => state.periodList = data,
    set_personalList: (state, data) => state.personalList = data,
    set_LineWeek: (state, data) => state.weekList = data,
    set_LineMonth: (state,data) =>state.monthList = data,
    set_RosterList: (state,data) =>state.rosterList = data,
    set_recordList: (state,data) =>state.recordList = data,
    set_CheckArr:(state,data) =>state.checkArrList = data,
    set_CheckEchart:(state,data) =>state.checkEchart = data,
  },
  actions: {
    /**
     * 考勤管理
    */
    //  考勤记录删除 post /delCheckingIn
    deleteAttendance({dispatch}, data) {
      let url = `/delCheckingIn`;
      let methods = 'post';
      fx.setConnect({url, methods, data})
      .then(res => {
        // 删除成功的回调，需要重新查一遍考勤列表证明删除成功
        dispatch('getAttendanceList')
      }).catch(err => {

      })
    },
    //  考勤记录修改 post /updCheckingIn
    updateAttendance({dispatch}, data) {
      let url = `/updCheckingIn`;
      let methods = 'post';
      fx.setConnect({url, methods, data})
      .then(res => {
        dispatch('getAttendanceList')
      }).catch(err => {
        
      })
    },
     //  考勤图表
     getECharts({state, dispatch}, page) {
      return new Promise( (resolve, reject) => {
      if(page) {
        // 保留page属性，添加、修改、删除之后依然保留当前页不变
        state.page = page;
      }else{
        // 复查时（修改、删除、添加时），不需要再传page属性了，直接回调使用即可。
        page = state.page;
      }
        let url = `/getECharts?startTime=${page.startTime}&endTime=${page.endTime}`;
        fx.setConnect({url})
        .then(res => {
         resolve(res)
        }).catch(err => {
          
        })
      })
    },
    
    //  考勤查询 get /getCheckingInPage
    getAttendanceList({state, commit}, page) {
      if(page) {
        // 保留page属性，添加、修改、删除之后依然保留当前页不变
        state.page = page;
      }else{
        // 复查时（修改、删除、添加时），不需要再传page属性了，直接回调使用即可。
        page = state.page;
      }
      // ``模板字符串下${}，可以直接使用js语法。
      let url = `/getCheckingInPage?pageSize=${page.pageSize}`
      +`&pageNum=${page.pageNum}&name=${page.name}`
      +`&departmentName=${page.departmentName}`
      +`&corporationName=${page.corporationName}`
      +`&startTime=${page.startTime}&endTime=${page.endTime}`;
      fx.setConnect({url})
      .then(res => {
        page.total = res.data.data.total * 1;
        // 同步设置考勤列表
        commit('set_GetAttendanceList', res.data.data)
      }).catch(err => {
        
      })
    },
    // 考勤记录导出(excel下载) post /getEquipmentExport
    downloadExcel({state}, page) {
      return new Promise((resolve, reject) => {
        let url = `https://sports.mjktech.com.cn/getEquipmentExport`;
        // let url = `http://192.168.1.238:8080/getEquipmentExport`;

        // 获取Token
        let token = getItem('token');
        // 为什么不使用fx.setConnect
        // 后台只传了stauts码，没有传code码，会导致axios报错
        axios({
          url: url,
          method: 'post',
          data: page,
          headers: {
            Authorization: token,
            // "Content-Type": "application/vnd.ms-excel"
            // 'Content-Type': 'application/x-www-form-urlencoded'
          },
          // 重中之重：将后台响应的文件数据转为blob格式
          responseType: "blob"
        })
        .then(res => {
         
            // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
            let fileName = '考勤表.xlsx';
            // 将`blob`对象转化成一个可访问的`url`
            let url = window.URL.createObjectURL(new Blob([res.data],));
            // js创造一个a标签
            let link = document.createElement('a');
            // 不可见
            link.style.display = 'none';
            link.href = url;
            // 为该a标签添加属性download，置顶下载文件的名称和格式
            link.setAttribute('download', fileName);
            // 将a标签放入body中
            document.body.appendChild(link);
            // 模拟点击，跳出保存栏
            link.click();
            // 清除该a标签
            document.body.removeChild(link);
            resolve();
        })
      })
    },
    //添加班次/addPeriod
    addShift({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/addPeriod`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          
        }).catch(err => {

        })
      })
    },
    // /updatePeriod 修改班次
    updateShift({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/updatePeriod`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getShiftList');
        }).catch(err => {

        })
      })
    },
    // 查询班次/selectPeriodByPage
    getShiftList({state, commit}, page) {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
      let url = `/selectPeriodByPage?rosterId=${page.rosterId}`
      +`&name=${page.name}&pageSize=${page.pageSize}`
      +`&pageNum=${page.currentPage}` ;
      fx.setConnect({url})
      .then(res => {
        commit('set_ShiftList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    },
    // /removePeriod 删除班次
    deleteShift({state, dispatch}, id) {
      return new Promise( (resolve, reject) => {
        let url = `/removePeriod?id=${id}`;
        let methods = 'post';
        fx.setConnect({url, methods})
        .then(res => {
          dispatch('getShiftList');
          resolve(1);
        }).catch(err => {

        })
      })
    },

     //添加考勤组/addRoster
     addClock({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/addRoster`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          
        }).catch(err => {

        })
      })
    },
    // /updateRoster 修改考勤组
    updateClock({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/updateRoster`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getClockList');
        }).catch(err => {

        })
      })
    },
    // 查询考勤组/selectRosterByPage
    getClockList({state, commit}, page) {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
      let url = `/selectRosterByPage?name=${page.name}&pageSize=${page.pageSize}`
      +`&pageNum=${page.currentPage}` ;
      fx.setConnect({url})
      .then(res => {
        commit('set_ClockList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    },
    //  /removeRoster 删除考勤组
    deleteClock({state, dispatch}, id) {
      return new Promise( (resolve, reject) => {
        let url = `/removeRoster?id=${id}`;
        let methods = 'post';
        fx.setConnect({url, methods})
        .then(res => {
          dispatch('getClockList');
          resolve(1);
        }).catch(err => {

        })
      })
    },
    // /getPeriodList 班次列表
    getPeriodList({state, commit}) {
      return new Promise((resolve, reject) => {
      let Authorization = getItem('token'); 
      let url = `/getPeriodList?Authorization=${Authorization}`;  
      fx.setConnect({url})
      .then( res => {
        commit('set_periodList', res.data.data);
        // state.periodList = res.data.data;
      }).catch( error => {
        
      })
    })
    }, 
    //考勤人员列表
    getPersonalAll({state, commit}) {
      return new Promise((resolve, reject) => {
        let Authorization = getItem('token'); 
      let url = `/getPersonalAll?Authorization=${Authorization}`;
      fx.setConnect( {url})
      .then( res => { 
        commit('set_personalList', res.data.data);
        // state.personalList = res.data.data;
      }).catch( error => {
        
      })
    })
    }, 
     // /getEchartsWeekly 获取周打卡情况
     getLineWeek({state, commit}) {
      return new Promise((resolve, reject) => {
        let Authorization = getItem('token'); 
      let url = `/getEchartsWeekly?Authorization=${Authorization}`;
      fx.setConnect( {url})
      .then(res => { 
      commit('set_LineWeek', res.data.data);
      resolve(res.data.data);
      }).catch( error => {
        
      })
    })
    }, 
      // /getEchartsWeekly 获取月打卡情况
      getLineMonth({state, commit}) {
        return new Promise((resolve, reject) => {
          let Authorization = getItem('token'); 
        let url = `/getMonthEcharts?Authorization=${Authorization}`;
        fx.setConnect( {url})
        .then(res => { 
        commit('set_LineMonth', res.data.data);
        resolve(res.data.data);
        }).catch( error => {
          
        })
      })
      }, 
      ///getPersonalByRosterId  根据rosterId加载人员信息(排除已经绑定考勤组的人)
      getPersonalByRosterId({state, commit}, page) {
        if(!page) {
          page = state.page;
        }else{
          state.page = page;
        }
        let url = `/getPersonalByRosterId?rosterId=${page.rosterId}` ;
        fx.setConnect({url})
        .then(res => {
          commit('set_RosterList', res.data.data);
          page.total = res.data.data.total * 1;
        }).catch(err => {
  
        })
      },
     //  考勤记录规则查询  /getCheckingInPage2  
     getCheckRecord({state, commit}, page) {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
      let str = ''
      for(let i in page){
        if(page[i] != ""){
          str += `${i}=${page[i]}&`
        }
      }
      str = str.slice(1,str.length-1)
      // let url = `/getCheckingInPage2?startTime=${obj.startTime?obj.startTime:''}&endTime=${obj.endTime?obj.endTime:''}&name=${obj.name?obj.name:''}&rosterId=${obj.rosterId?obj.rosterId:''}`;
      let url = `/getCheckingInPage2?${str}`;

      fx.setConnect({url})
      .then(res => {
        commit('set_recordList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    },
    // /selectRosterList
    getCheckArr({state, commit}) {
      return new Promise((resolve, reject) => {
        let Authorization = getItem('token'); 
      let url = `/selectRosterList?Authorization=${Authorization}`;
      fx.setConnect( {url})
      .then( res => { 
        commit('set_CheckArr', res.data.data);
   
      }).catch( error => {
        
      })
    })
    }, 
    // /getCheckingInPage2Export 考勤记录导出
    getDownloadExcel({state}, page) {
      return new Promise((resolve, reject) => {
        let str = ''
        for(let i in page){
          if(page[i] != ""){
            str += `${i}=${page[i]}&`
          }
        }
        str = str.slice(1,str.length-1)
        let url = `https://sports.mjktech.com.cn/getCheckingInPage2Export?${str}`
        // let url = `http://192.168.1.238:8080/getCheckingInPage2Export?name=${page.name}`
        // +`&startTime=${page.startTime}`
        // +`&endTime=${page.endTime}`
        // +`&rosterId=${page.rosterId}`;    
        let token = getItem('token');
        axios({
          url: url,
          data: page,
          headers: {
            Authorization: token,
          },
          responseType: "blob"
        })
        .then(res => {        
            let fileName = '考勤表.xlsx';
            let url = window.URL.createObjectURL(new Blob([res.data],{type: "application/vnd.ms-excel"}));
            // js创造一个a标签
            let link = document.createElement('a');
            // 不可见
            link.style.display = 'none';
            link.href = url;
            // 为该a标签添加属性download，置顶下载文件的名称和格式
            link.setAttribute('download', fileName);
            // 将a标签放入body中
            document.body.appendChild(link);
            // 模拟点击，跳出保存栏
            link.click();
            // 清除该a标签
            document.body.removeChild(link);
            resolve();
        })
      })
    },
     //  考勤记录图表 /getCheckingInEcharts
     getCheckECharts({state, commit}, page) {
      return new Promise( (resolve, reject) => {
        if(!page) {
          page = state.page;
        }else{
          state.page = page;
        }
        let str = ''
        for(let i in page){
          if(page[i] != ""){
            str += `${i}=${page[i]}&`
          }
        }
        str = str.slice(1,str.length-1)
        let url = `/getCheckingInEcharts?${str}`;
        fx.setConnect({url})
        .then(res => {
          commit('set_CheckEchart', res.data.data);
         resolve(res.data.data)
        }).catch(err => {
          
        })
      })
    },

  }
}
export default attendence
