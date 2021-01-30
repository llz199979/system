// 获取接口参数
import fx from '../../utils/fx'
import api from '../../utils/api'
import { setItem, getItem, removeItem } from '../../utils/token'
import axios from 'axios'
// import { resolve } from 'core-js/fn/promise'

const corporation = {
  state: {
    page: {},            //分页对象
    // userList: [], //用户列表
    // roleList: [], //角色列表
    corporationList: [], //公司列表
    departmentList: {},  //部门列表
    leaderList: {},      //领导列表
    staffList: {},        //员工列表
    // attendanceList: {}    //考勤列表
  },
  getters: {
    // getRouter: state => state.asyncRouterMap_,
    // get_Userlist: state => state.userList,
    // get_RoleList: state => state.roleList,
    get_CorporationList: state => state.corporationList,
    get_DepartmentList: state => state.departmentList,
    get_LeaderList: state => state.leaderList,
    get_StaffList: state => state.staffList,
    // get_AttendanceList: state => state.attendanceList,

  },
  mutations: {
    // set_UserList: (state, data) => state.userList = data,
    // set_RoleList: (state, data) => state.roleList = data,
    set_CorporationList: (state, data) => state.corporationList = data,
    set_DepartmentList: (state, data) => state.departmentList = data,
    set_LeaderList: (state, data) => state.leaderList = data,
    set_StaffList: (state, data) => state.staffList = data,
    // set_GetAttendanceList: (state, data) => state.attendanceList = data,
    // treeMenu() {
    //   let branch = JSON.parse(getItem('branch'));
    //   let tree = JSON.parse(getItem('catalogue'));
    //   let bottomArr = []; //底层菜单（3级）
    //   branch.forEach( (v, i) => {
    //     // v.label = v.permissionName;
    //     if(v.nodeId){ //分支与外部树干的关联ID,二级菜单
    //       tree.find((t, i) => {
    //         t.label = t.name;
    //         t.menu = true;
    //         if(t.id == v.nodeId) {
    //           if(!t.children) {
    //             t.children = [];
    //           }
    //           t.children.push({
    //             id: v.permissionId,
    //             label: v.permissionName,
    //             parentId: v.permissionId
    //           });
    //         }
    //       })
    //     }else{   //三级菜单
    //       bottomArr.push({
    //         id: v.permissionId,
    //         parentId: v.parentId,
    //         label: v.permissionName
    //       })
    //     }
    //   })
    //   bottomArr.forEach(a => {
    //     var flag = false;
    //     tree.find(tr => {
    //       if(tr.children) {
    //         flag = tr.children.find( mid => {
    //           if(mid.parentId == a.parentId) {
    //             if(!mid.children) {
    //               mid.children = []
    //             }
    //             mid.children.push(a)
    //             return true;
    //           }
    //         })
    //         if(flag){ return ;}
    //       }
    //     })
    //   })
   
    //   setItem('tree', JSON.stringify(tree));
    // },
  },
  actions: {
  /**
   * 公司业务
   *  
   * 
   */
    // 添加当前账户下的公司 post /corporation/addCorporation
    addCorporation({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/addCorporation`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getCorporationList');
        }).catch(err => {

        })
      })
    },
    // 删除公司信息 post /corporation/delCorporation
    deleteCorporation({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
    
        let url = `/corporation/delCorporation`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          dispatch('getCorporationList');
        }).catch(err => {

        })
      })
    },
    // 修改公司信息/corporation/updCorporation
    updateCorporation({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/updCorporation`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          dispatch('getCorporationList');
          resolve(1);
        }).catch(err => {

        })
      })
    },
    // 获取当前租户下的公司list get /corporation/getCorporationList
    getCorporationList({state, commit}, page) {
      if(page) {
        state.page = page;
      }else{
        page = state.page;
      }
      let url = `/corporation/getCorporationList?pageSize=${page.pageSize}&pageNum=${page.pageNum}&corporationName=${page.corporationName}`;
      fx.setConnect({url})
      .then(res => {
        page.total = res.data.data.total *1;
        commit('set_CorporationList', res.data.data);
      }).catch(err => {

      })
    },
    /**
     * 部门业务
     * 
     */
    // 添加部门 /corporation/addDepartment
    addDepartment({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/addDepartment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
         
          resolve(1)
          dispatch('getDepartmentList');
        }).catch(err => {

        })
      })
    },
    
    //删除部门 post /corporation/delDepartment
    deleteDepartment({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/delDepartment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          dispatch('getDepartmentList');
        }).catch(err => {

        })
      })
    },
    // 修改部门 post /corporation/updDepartment

    updateDepartment({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/updDepartment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getDepartmentList');
        }).catch(err => {

        })
      })
    },
    // 部门查询 get /corporation/getDepartmentPageList

    getDepartmentList({state, commit}, page) {
      return new Promise((resolve, reject) => {
        if(!page) {
          page = state.page;
        }else{
          state.page = page;
        }
        let url = `/corporation/getDepartmentPageList?corpId=${page.corpId}&pageSize=${page.pageSize}&pageNum=${page.pageNum}&name=${page.name}` ;
        fx.setConnect({url})
        .then(res => {
          commit('set_DepartmentList', res.data.data);
          page.total = res.data.data.total * 1;
          resolve(res.data.data);
        }).catch(err => {
  
        })
      })
    },
    // 根据公司id加载部门列表 /corporation/loadDepartmentByCorpId
    getDepartmentIdList({state, commit}, id) {
      return new Promise((resolve, reject) => {    
        let url = `/corporation/loadDepartmentByCorpId?id=${id}`;
        fx.setConnect({url})
        .then(res => {
          commit('set_DepartmentList', res.data.data);
         
          resolve(res.data.data);
        }).catch(err => {
  
        })
      })
    },
    /**
     * 领导业务
     *  
     * 
     */
    // 领导信息增加 post /corporation/addLeadPersonal

    addLeader({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/addLeadPersonal`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getLeaderList');
        }).catch(err => {

        })
      })
    },
    
    //领导信息删除 post /corporation/delLeadPersonal

    deleteLeader({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/delLeadPersonal`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          dispatch('getLeaderList');
        }).catch(err => {

        })
      })
    },
    // 修改部门 post /corporation/updLeadPersonal
    updateLeader({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/updLeadPersonal`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getLeaderList');
        }).catch(err => {

        })
      })
    },
    // 领导信息查询/corporation/getLeadPersonalPage


    getLeaderList({state, commit}, page) {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
      let url = `/corporation/getLeadPersonalPage?corpId=${page.corpId}`
      +`&departmentId=${page.departmentId}&pageSize=${page.pageSize}`
      +`&pageNum=${page.pageNum}&nameOrPhone=${page.nameOrPhone}` ;
      fx.setConnect({url})
      .then(res => {
        commit('set_LeaderList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    },
    /**
     * 员工业务
     *  
     * 
     */
    // 员工信息增加 post /corporation/addPersonal

    addStaff({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/addPersonal`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          
        }).catch(err => {

        })
      })
    },
    
    //员工信息删除 post /corporation/delPersonal

    deleteStaff({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/delPersonal`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getStaffList');
        }).catch(err => {

        })
      })
    },
    // 修改部门 post /corporation/updPersonal
    updateStaff({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/corporation/updPersonal`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getStaffList');
        }).catch(err => {

        })
      })
    },
    // 员工信息查询/corporation/getPersonalPage


    getStaffList({state, commit}, page) {
      if(!page) {
        page = state.page;
      }else{
        state.page = page;
      }
      let url = `/corporation/getPersonalPage?corpId=${page.corpId}`
      +`&departmentId=${page.departmentId}&pageSize=${page.pageSize}`
      +`&pageNum=${page.pageNum}&nameOrPhone=${page.nameOrPhone}` ;
      fx.setConnect({url})
      .then(res => {
        commit('set_StaffList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    },
    //学生图片批量导入 
    uploadBatch ({ state, rootState, dispatch}, file) {
      return new Promise((resolve, reject) => {
        // let url = `/corporation/uploadPicture`
        let url = `/corporation/uploadPicture`
        let methods = 'post'
        let Authorization = rootState.Authorization;
        let data = file;
        fx.setConnect({state}, {url, methods, data, Authorization })
      
        }).then( res => {
          resolve(res.data.data);
        })
        .catch( error => {
        })
      // })
    },

    /**
     * 考勤管理
    */
    //  考勤记录删除 post /delCheckingIn
    // deleteAttendance({dispatch}, data) {
    //   let url = `/delCheckingIn`;
    //   let methods = 'post';
    //   fx.setConnect({url, methods, data})
    //   .then(res => {
    //     dispatch('getAttendanceList')
    //   }).catch(err => {

    //   })
    // },
    //  考勤记录修改 post /updCheckingIn
    // updateAttendance({dispatch}, data) {
    //   let url = `/updCheckingIn`;
    //   let methods = 'post';
    //   fx.setConnect({url, methods, data})
    //   .then(res => {
    //     dispatch('getAttendanceList')
    //   }).catch(err => {
        
    //   })
    // },
    //  考勤查询 get /getCheckingInPage
    // getAttendanceList({state, commit}, page) {
    //   if(page) {
    //     state.page = page;
    //   }else{
    //     page = state.page;
    //   }
    //   let url = `/getCheckingInPage?pageSize=${page.pageSize}`
    //   +`&pageNum=${page.currentPage}&name=${page.name}`
    //   +`&departmentName=${page.departmentName}`
    //   +`&corporationName=${page.corporationName}`
    //   +`&startTime=${page.startTime}&endTime=${page.endTime}`;
    //   fx.setConnect({url})
    //   .then(res => {
    //     page.total = res.data.data.total * 1;

    //     commit('set_GetAttendanceList', res.data.data)
    //   }).catch(err => {
        
    //   }) 
    // },
    // 考勤记录导出 post /getEquipmentExport
    downloadExcel({state}, page) {
      return new Promise((resolve, reject) => {
        let url = `https://sports.mjktech.com.cn/getEquipmentExport`;
        // let url = `http://192.168.1.238:8080/getEquipmentExport2?name=${page.name}`
        // +`&departmentName=${page.departmentName}`
        // +`&corporationName=${page.corporationName}`
        // +`&startTime=${page.startTime}&endTime=${page.endTime}`;
        let token = getItem('token');
        axios({
          url: url,
          method: 'post',
          data: page,
          headers: {
            Authorization: token,
          },
          responseType: "blob"
        })
        .then(res => {
         
            // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
            let fileName = '考勤表.xlsx';
            // 将`blob`对象转化成一个可访问的`url`
            let url = window.URL.createObjectURL(new Blob([res.data],));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve();
        })
      })
    },
    ///corporation/getLeadPersonalExportAll 导出领导信息
    getLeaderMassage({state}, page) {
      return new Promise((resolve, reject) => {
        let url = `https://sports.mjktech.com.cn/corporation/getLeadPersonalExportAll`;
        let token = getItem('token');
        axios({
          url: url,
          method: 'post',
          data: page,
          headers: {
            Authorization: token,
          },
          responseType: "blob"
        })
        .then(res => {
         
            // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
            let fileName = '信息表.xlsx';
            // 将`blob`对象转化成一个可访问的`url`
            let url = window.URL.createObjectURL(new Blob([res.data],));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve();
        })
      })
    },
    // /corporation/getPersonalExportAll 导出员工信息
    getStaffMassage({state}, page) {
      return new Promise((resolve, reject) => {
        let url = `https://sports.mjktech.com.cn/corporation/getPersonalExportAll`;
        let token = getItem('token');
        axios({
          url: url,
          method: 'post',
          data: page,
          headers: {
            Authorization: token,
          },
          responseType: "blob"
        })
        .then(res => {
         
            // 截取文件名，这里是后端返回了文件名+后缀，如果没有可以自己拼接
            let fileName = '信息表.xlsx';
            // 将`blob`对象转化成一个可访问的`url`
            let url = window.URL.createObjectURL(new Blob([res.data],));
            let link = document.createElement('a');
            link.style.display = 'none';
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            resolve();
        })
      })
    },
  }
}
export default corporation
