// import account from '../views/system/account'
// let h = () => import('../views/Home/Home');
// let Home = h();
// import homes from '../views/Home/Home'
// let Home = require.context('../views/Home/Home')
// import Home from '../views/Home/Home'
// title项命名为Vue-$i8n lang 中的键值, 为路由语言切换提供支持。
import home from '@/views/Home/Home'
// console.log(home)
// import {router} from './index'
export const asyncRouterMap = [{
  path: '/system',
  name: 'system', 
  // 路由懒加载
  component: () => import('@/views/Home/Home'),
  meta: { title: 'm.router.systemManage', icon: 'el-icon-user-solid el' },
  menu: ['system'],
  children: [{
    path: 'account',
    name: 'account',
    component: () => import("../views/system/account"),
    meta: { title: 'm.router.account', icon: 'el-icon-guide el'},
    menu: 'user'
  },
  {
    path: 'role',
    name: 'role',
    component: () => import("../views/system/role"),
    meta: { title: 'm.router.role', icon: 'el-icon-edit el'},
    menu: 'role'
  },
  {
    path: 'log',
    name: 'log',
    component: () => import("../views/system/log"),
    meta: { title: 'm.router.log', icon: 'el-icon-document el'},
    menu: 'log'
  },
  {
    path: 'manage',
    name: 'manage',
    component: () => import("../views/system/manage"),
    meta: { title: 'm.router.manage', icon: 'el-icon-document el'},
    menu: 'manage'
  },
  {
    path: 'star',
    name: 'star1',
    component: () => import("../views/system/star"),
    meta: { title: '星星', icon: 'el-icon-set-up el'},
    menu: ''
  }]
},
{
  path: '/corporation',
  name: 'corporation',
  component: () => import('@/views/Home/Home'),
  meta: { title: 'm.router.corporation', icon: 'el-icon-menu el'},
  children: [{
    path: 'manage',
    name: 'manage',
    meta: {title: 'm.router.corporation', icon: 'el-icon-s-flag el'},
    component: () => import('../views/corporation/manage'),
    menu: 'corporation'
  },
  {
    path: 'department',
    name: 'department',
    meta: { title: 'm.router.department', icon: 'el-icon-s-help el'},
    component: () => import('../views/corporation/department'),
    menu: 'department'
  },
  {
    path: 'leader',
    name: 'leader',
    meta: { title: 'm.router.leader', icon: 'el-icon-s-custom el'},
    component: () => import('../views/corporation/leader'),
    menu: 'leader'
  },
  {
    path: 'staff',
    name: 'staff',
    meta: { title: 'm.router.staff', icon: 'el-icon-user-solid el'},
    component: () => import('../views/corporation/staff'),
    menu: 'staff'
  }
]
},
{
  path: '/school',
  name: 'school',
  component: () => import('@/views/Home/Home'),
  meta: { title: 'm.router.school', icon: 'el-icon-menu el'},
  children: [{
    path: 'schoolManage',
    name: 'schoolManage',
    meta: {title: 'm.router.school', icon: 'el-icon-s-flag el'},
    component: () => import('../views/school/schoolManage'),
    menu: 'school'
  },
  {
    path: 'class',
    name: 'class',
    meta: { title: 'm.router.class', icon: 'el-icon-s-help el'},
    component: () => import('../views/school/class'),
    menu: 'classes'
  },
  {
    path: 'teacher',
    name: 'teacher',
    meta: { title: 'm.router.teacher', icon: 'el-icon-s-custom el'},
    component: () => import('../views/school/teacher'),
    menu: 'teacher'
  },
  {
    path: 'student',
    name: 'student',
    meta: { title: 'm.router.student', icon: 'el-icon-user-solid el'},
    component: () => import('../views/school/student'),
    menu: 'student'
  }
]
},
  {
    path: '/check',
    name: 'check',
    component: () => import('@/views/Home/Home'),
    meta: { title: 'm.router.attendanceManage', icon: 'el-icon-s-tools el' },
    // menu: ['admin'],
    children: [{
      path: 'attendance',
      name: 'ad1',
      component: () => import('../views/check/attendance'),
      meta: { title: 'm.router.attendance', icon: 'el-icon-date el'},
      menu: 'attendance'
    },{
      path: 'clockArr',
      name: 'clockArr',
      component: () => import('../views/check/clockArr'),
      meta: { title: 'm.router.attendanceManageArr', icon: 'el-icon-bangzhu el'},
      menu: 'clockArr'
    },{
      path: 'shiftManage',
      name: 'shiftManage',
      component: () => import('../views/check/shiftManage'),
      meta: { title: 'm.router.shiftManage', icon: 'el-icon-paperclip el'},
      menu: 'shiftManage'
    },{
      path: 'attendanceQuery',
      name: 'attendanceQuery',
      component: () => import('../views/check/attendanceQuery'),
      meta: { title: 'm.router.attendanceQuery', icon: 'el-icon-edit-outline el'},
      menu: 'attendance'
    },{
      path: 'attendanceRate',
      name: 'attendanceRate',
      component: () => import('../views/check/attendanceRate'),
      meta: { title: 'm.router.attendanceRate', icon: 'el-icon-s-data el'},
      menu: 'attendance'
    },{
      path: 'eg1',
      name: 'ad1',
      component: () => import('../views/check/eg1'),
      meta: { title: '示例1', icon: 'el-icon-loading el'},
      menu: ['admin']
    },
    {
      path: 'eg2',
      name: 'ad2',
      component: () => import("../views/check/eg2"),
      meta: { title: '示例2', icon: 'el-icon-paperclip el'},
      menu: ['admin']
    },
    {
      path: 'star2',
      name: 'star',
      component: () => import("../views/check/star"),
      meta: { title: '星星', icon: 'el-icon-bangzhu el'},
      menu: ['admin']
    }
  ]
},
{
  path: '/deviceManage',
  name: 'deviceManage',
  component: () => import('@/views/Home/Home'),
  meta: { title: 'm.router.deviceManage', icon: 'el-icon-set-up  el' },
  children: [{
    path: 'device',
    name: 'device',
    component: () => import('../views/device/device'),
    meta: { title: 'm.router.device', icon: 'el-icon-s-operation'},
    menu: 'device'
  },
  {
    path: 'firmware',
    name: 'firmware',
    component: () => import('../views/device/firmware'),
    meta: { title: 'm.router.firmware', icon: 'el-icon-suitcase'},
    menu: 'firmware'
  }]
},
{
  path: '/materialManage',
  name: 'materialManage',
  component: () => import('@/views/Home/Home'),
  meta: { title: 'm.router.materialManage', icon: 'el-icon-folder-opened' },
  children: [{
    path: 'material',
    name: 'material',
    component: () => import('../views/materialManage/material'),
    meta: { title: 'm.router.material', icon: 'el-icon-folder'},
    menu: 'material'
  },
  {
    path: 'release',
    name: 'release',
    component: () => import('../views/materialManage/release'),
    meta: { title: 'm.router.release', icon: 'el-icon-s-release'},
    menu: 'release'
  }
]
},
]
