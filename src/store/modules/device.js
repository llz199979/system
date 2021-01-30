// 设备管理增删改查
import fx from '../../utils/fx'
import api from '../../utils/api'
import { setItem, getItem, removeItem } from '../../utils/token'
// import { reject } from 'core-js/fn/promise'

const device = {
  state: {
    page: {},     //分页对象
    deviceList: [], //用户列表
    // roleList: [], //角色列表
    materialList:[],
    loadEquipList:[],
    loadMaterList:[],
    MateEquipList:[],
    firmwareList:[]
  },
  getters: {
    // getRouter: state => state.asyncRouterMap_,
    // get_Userlist: state => state.userList,
    get_DeviceList: state => state.deviceList,
    get_Material:state => state.materialList,
    get_MateEquipList:state => state.MateEquipList,
    get_loadEquip:state => state.loadEquipList,
    get_loadMaterial:state=>state.loadMaterList,
    get_FirmwareList:state=>state.firmwareList
  },
  mutations: {
    // set_UserList: (state, data) => state.userList = data,
    set_DeviceList: (state, data) => state.deviceList = data,
    set_Material:(state,data) => state.materialList = data,
    set_MateEquipList:(state,data) => state.MateEquipList = data,
    set_LoadEquip:(state,data) => state.loadEquipList = data,
    set_LoadMaterial:(state,data) => state.loadMaterList = data,
    set_FirmwareList:(state,data) => state.firmwareList = data,
  },
  actions: {
    // 添加设备 post /equipment/addEquipment

    addDevice({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/addEquipment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getDeviceList');
        }).catch(err => {

        })
      })
    },
    // 删除设备 post /equipment/delEquipment
    deleteDevice({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/delEquipment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          dispatch('getDeviceList');
        }).catch(err => {

        })
      })
    },
    // // 查询设备列表 get /equipment/getEquipmentPage
    // getDevice({state}) {
    //   return new Promise( (resolve, reject) => {
    //     let url = `/equipment/getEquipmentPage`;
    //     fx.setConnect({url})
    //     .then(res => {
    //       resolve(res.data.data)
    //     }).catch(err => {

    //     })
    //   })
    // },
    // 修改设备 post /equipment/updEquipment
    updateDevice({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/updEquipment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getDeviceList');
        }).catch(err => {

        })
      })
    },
    // 查询设备列表 get /system/getRoleListPage
    getDeviceList({state, commit}, page) {
      if(page) {
        state.page = page;
      }else{
        page = state.page;
      }
      let url = `/equipment/getEquipmentPage?pageSize=${page.pageSize}&pageNum=${page.currentPage}&nameOrMacId=${page.nameOrMacId}`;
      fx.setConnect({url})
      .then(res => {
        //page 期待一个 number类型的值.
        page.total = res.data.data.total * 1;
        commit('set_DeviceList', res.data.data);
      }).catch(err => {

      })
    },
    // /equipment/insertFirmware    版本添加
    addFirmware({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/insertFirmware`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getFirmwareList');
        }).catch(err => {

        })
      })
    },
    // /equipment/getFirmwareByPage 版本查询
    getFirmwareList({state, commit}, page) {
      if(page) {
        state.page = page;
      }else{
        page = state.page;
      }
      let url = `/equipment/getFirmwareByPage?pageSize=${page.pageSize}&pageNum=${page.currentPage}&appName=${page.appName}`;
      fx.setConnect({url})
      .then(res => {
        //page 期待一个 number类型的值.
        page.total = res.data.data.total * 1;
        commit('set_FirmwareList', res.data.data);
      }).catch(err => {

      })
    },
    // /equipment/updateFirmware 版本修改
    updateFirmware({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/updateFirmware`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getFirmwareList');
        }).catch(err => {

        })
      })
    },
    // /equipment/removeFirmware 版本删除
    deleteFirmware({state, dispatch}, id) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/removeFirmware?id=${id}`;
        let methods = 'post';
        fx.setConnect({url, methods})
        .then(res => {
          dispatch('getFirmwareList');
        }).catch(err => {

        })
      })
    },
    // /material/insertMaterial 素材添加
    uploadMaterial({ state, rootState, dispatch}, file) {
      return new Promise((resolve, reject) => {
        let url = `/material/insertMaterial`
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
    // /material/getMaterialAllPage 素材分页查询
    getMaterial({state,commit},page){
      if(!page){
        page = state.page;
      }else{
        state.page = page;
      }
      let url = `/material/getMaterialAllPage?pageNum=${page.pageNum}&pageSize=${page.pageSize}&type=${page.type}&name=${page.name}`;
      fx.setConnect({url})
      .then(res=>{
        commit('set_Material',res.data.data);
        page.total = res.data.data.total * 1;
      })
    },
   // /material/removeMaterial 素材删除
    deleteMaterial({state,dispatch},id){
      return new Promise((resolve,reject) => {
        let url = `/material/removeMaterial?id=${id}`;
        let methods = 'post';
        fx.setConnect({url,methods})
        .then(res =>{
          dispatch('getMaterial');
          resolve(1)
        })
      })
    },
    // /material/insertMaterialAndEquipment 添加设备的素材 (素材绑定设备)
    addMateEquip({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/material/insertMaterialAndEquipment`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getMateEquip');
        }).catch(err => {

        })
      })
    },
    // /material/getMaterialAndEquipmentListByMacId 根据macId查询该设备绑定的素材
    getMateEquip({state,commit}, page) {
      return new Promise( (resolve, reject) => {
        if(page) {
          state.page = page;
        }else{
          page = state.page;
        }
        let url = `/material/getMaterialAndEquipmentListByMacId?macId=${page.macId}`;
        fx.setConnect({url})
        .then(res => {
          commit('set_MateEquipList', res.data.data);
          resolve(res.data.data)
        }).catch(err => {

        })
      })
    },
    // /material/removeMaterialAndEquipment 删除设备和素材绑定
    deleteMateEquip({state,dispatch},mediaId ){
      return new Promise((resolve,reject) => {
        let url = `/material/removeMaterialAndEquipment?mediaId=${mediaId}`;
        let methods = 'post';
        fx.setConnect({url,methods})
        .then(res =>{
          dispatch('getMateEquip');
          resolve(1)
        })
      })
    },
    // /material/loadEquipment 加载设备列表
    getLoadEquip({state, commit}) {
      return new Promise((resolve, reject) => {
      let Authorization = getItem('token'); 
      let url = `/material/loadEquipment?Authorization=${Authorization}`;  
      fx.setConnect({url})
      .then( res => {
        commit('set_LoadEquip', res.data.data);
      }).catch( error => {
        
      })
    })
    }, 
    // /material/loadMaterial 加载素材列表
    getLoadMaterial({state, commit}) {
      return new Promise((resolve, reject) => {
      let Authorization = getItem('token'); 
      let url = `/material/loadMaterial?Authorization=${Authorization}`;  
      fx.setConnect({url})
      .then( res => {
        commit('set_LoadMaterial', res.data.data);
      }).catch( error => {
        
      })
    })
    }, 
    
    // /equipment/updateEquipmentConfig 修改设备配置信息
     setUpConfig({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/equipment/updateEquipmentConfig`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getDeviceList');
        }).catch(err => {

        })
      })
    }

  }
}
export default device
