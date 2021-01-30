// 系统管理增删改查
import fx from '../../utils/fx'
import api from '../../utils/api'
import { setItem, getItem, removeItem } from '../../utils/token'
import { m } from '../../lang/jp';

const system = {
  state: {
    page: {},     //分页对象
    userList: [], //用户列表
    roleList: [], //角色列表
    logList: [],  //日志列表
    
  },
  getters: {
    // getRouter: state => state.asyncRouterMap_,
    get_Userlist: state => state.userList,
    get_RoleList: state => state.roleList,
    get_LogList: state => state.logList
  },
  mutations: {
    set_UserList: (state, data) => state.userList = data,
    set_RoleList: (state, data) => state.roleList = data,
    set_LogList: (state, data) => state.logList = data,
    // 角色权限表见路由/system/role 的添加和修改选项
    treeMenu() {
      // 获取顶级目录
      let tree = JSON.parse(getItem('catalogue'));
      // 获得二级目录
      let branch = JSON.parse(getItem('branch'));
      let bottomArr = []; //底层菜单（3级）
      let language = localStorage.getItem('locale');
      // 将二级目录插入到一级目录中去
      branch.forEach( (v, i) => {
        // v.label = v.permissionName;
        if(v.nodeId){ //分支与外部树干的关联ID,二级目录
          // 二级目录nodeId 与顶级目录的Id 一一对应
          tree.find((t, i) => {
            t.label= language == 'en'?t.routeName : language == 'zh'? t.name :t.routeJapanName;  // 化作element-UI tree组件所需的数据格式
            t.menu = true;
            if(t.id == v.nodeId) { // 是否关联
              if(!t.children) {    // 一级目录是否存在二级目录数组
                t.children = [];   // 存在跳过，不存在则添加
              }
              t.children.push({    // 添加二级目录下的信息
                id: v.permissionId,//化作element-UI tree组件所需的数据格式
                parentId: v.permissionId,
                // label : language == 'zh'? v.permissionName : v.permissionEnglishName
                label :language == 'en'?v.permissionEnglishName : language == 'zh'? v.permissionName :v.permissionNameJapanName
              });
            }
          })
        }else{   //三级菜单
          bottomArr.push({         // 添加三级目录下的信息
            id: v.permissionId,    // 化作element-UI tree组件所需的数据格式
            parentId: v.parentId,
            label : language == 'en'?v.permissionEnglishName : language == 'zh'? v.permissionName :v.permissionNameJapanName
          })
        }
      })
      //         -二级目录  
      // 顶级目录-二级目录
      //         -二级目录  
      // 将三级菜单插入到已经处理好的顶级目录
      bottomArr.forEach(a => {
        var flag = false;
        tree.find(tr => {
          // 顶级目录下是否有二级目录
          if(tr.children) {
            flag = tr.children.find( mid => {
              // 对每个二级目录进行搜寻，判断两者关联Id是否相等
              if(mid.parentId == a.parentId) {
                if(!mid.children) {
                  mid.children = []
                }
                mid.children.push(a)
                return true;
              }
            })
            if(flag){ return ;}
          }
        })
      })
      // console.log('tree')
      // console.log(tree);
      // console.log(bottomArr);
      setItem('tree', JSON.stringify(tree));
    },
  },
  actions: {
    // 添加角色以及对应的权限 post /system/addRole
    addRole({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/system/addRole`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getRoleList');
        }).catch(err => {

        })
      })
    },
    // 删除角色信息 post /system/delRoleById
    deleteRole({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/system/delRoleById`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          dispatch('getRoleList');
        }).catch(err => {

        })
      })
    },
    // 根据角色ID查询角色所对应的权限 get /system/getRoleById
    getRoleById({state}, roleId) {
      return new Promise( (resolve, reject) => {
        let url = `/system/getRoleById?roleId=${roleId}`;
        fx.setConnect({url})
        .then(res => {
          resolve(res.data.data)
        }).catch(err => {

        })
      })
    },
    //验证用户名是否存在
    existsUserName({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/existsUserName?userName=${data}`;
        fx.setConnect({url})
        .then(res => {
          resolve(res)
        }).catch(err => {

        })
      })
    },
    // 修改角色以及对应的权限 post /system/updRole
    updateRole({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/system/updRole`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getRoleList');
        }).catch(err => {

        })
      })
    },
    // 查询角色列表 get /system/getRoleListPage
    getRoleList({state, commit}, page) {
      if(page) {
        state.page = page;
      }else{
        page = state.page;
      }
      let url = `/system/getRoleListPage?pageSize=${page.pageSize}&pageNum=${page.currentPage}&roleName=${page.roleName}`;
      fx.setConnect({url})
      .then(res => {
        page.total = res.data.data.total *1;
        commit('set_RoleList', res.data.data);
      }).catch(err => {

      })
    },
    // 添加新用户(租户) post /system/addUser
    addUser({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/system/addUser`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1)
          dispatch('getUserListPage');
        }).catch(err => {

        })
      })
    },
   
    
    // 删除用户信息 post  /system/removeUser
    deleteUser({state, dispatch}, id) {
      return new Promise( (resolve, reject) => {
        let url = `/system/removeUser?id=${id}`;
        let methods = 'post';
        fx.setConnect({url, methods})
        .then(res => {
          dispatch('getUserListPage');
          resolve(1);
        }).catch(err => {

        })
      })
    },
    // 修改用户信息 post /system/updUser
    updateUser({state, dispatch}, data) {
      return new Promise( (resolve, reject) => {
        let url = `/system/updUser`;
        let methods = 'post';
        fx.setConnect({url, methods, data})
        .then(res => {
          resolve(1);
          dispatch('getUserListPage');
        }).catch(err => {

        })
      })
    },
    // 获取用户信息 get /system/getUserListPage
    getUserListPage({state, commit}, page) {
      if(!page) {
        page = state.page;

      }else{
        state.page = page;
      }
      let url = `/system/getUserListPage?pageSize=${page.pageSize}&pageNum=${page.currentPage}&userName=${page.userName}` ;
      fx.setConnect({url})
      .then(res => {
        commit('set_UserList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    },
    // 查询用户操作日志 get /system/getUserLogPage
    getLogList({state, commit}, page) {
      let url = `/system/getUserLogPage?pageSize=${page.pageSize}&pageNum=${page.currentPage}&userName=${page.userName}&operation=${page.operation}` ;
      fx.setConnect({url})
      .then(res => {
        commit('set_LogList', res.data.data);
        page.total = res.data.data.total * 1;
      }).catch(err => {

      })
    }
  }
}
export default system
