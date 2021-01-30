<template>
      <!-- aside 侧边导航栏 -->
      <div id="sidebar" class="sidebar">
      <el-menu style="height:93%; overflow-y:auto;"
        class="aside aside-menu refuseCopy" :router="true"
        text-color="#fff"
        active-text-color="#3ff"
        background-color="rgb(50, 64, 87)"
        unique-opened
        :collapse="unfold"
        :default-active="$route.path"
      >
          <el-submenu 
          v-for="(v,i) in getRouter"
          :key="i"
          :index="i + '0'"
        > 
          <template slot="title">
            <i :class="v.meta.icon" :style="{'color':getTheme}" />
            <span slot="title">{{$t(v.meta.title) }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item @click="handlePage(child, v.path)"
              v-for="(child,id) in v.children"
              :key="id"
              :index="v.path + '/' + child.path"
            >
              <i :class="child.meta.icon" />{{ $t(child.meta.title) }}
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
        <i ref="iconRotate"
          id="showHidden"
          class="el-icon-s-unfold"
          @click="showHidden"
        />
          <!-- :class="unfold ? 'el-icon-s-fold' : 'el-icon-s-unfold'" -->
      </div>
</template>

<script>
export default {
    name: 'sidebar',
    data() {
        return {
            unfold: false,      //导航栏是否展开
            activeIndex: '',
            index: '',
            breadList: [],
            user:{},
        }
    },
    watch: {
      $route: {
        handler: function(val, oldVal) {
          this.activeIndex = val.path;
          let path = val.path;
          this.activeIndex = path;
        }
      }
    },
    computed: {
        getRouter() {
          let router = this.$store.getters.getRouter
          router = router.filter(v => {
//              this.$store.dispatch('addUser', user)
//                   .then(res => {
//            if(user.type==1){
//               router.meta.title='$t(m.router.school)'
//            }else{
//              router.meta.title='$t(m.router.corporation)'
//            }
//           })
            return v.children.length;
          })
            return router;
        },
        getTheme() {
        return this.$store.getters.getTheme;
      }
    },
    methods: {
      showHidden() {
        this.unfold = !this.unfold;
        let deg = this.unfold ? '180deg' : '0deg'
        this.$refs['iconRotate'].style.transform = "rotate("+ deg +")";
      },
      handleOpen(key, keyPath) {
      },
      handlePage(v, f) {
        let obj = {
        name: v.meta.title,
        path: f + '/' + v.path
      }
        this.$store.commit('set_breadList', obj);
      }
    },
    mounted() {
      // this.activeIndex = window.location.pathname;
    }
}
</script>

<style lang="scss">
#sidebar{
    font-family: Helvetica Neue,Helvetica,Arial,Microsoft Yahei,sans-serif;
    height:100%;
    background:rgb(50, 64, 87);
    box-shadow: 2px 0 2px #aaa;
    // box-shadow: 2px 2px 10px 10px #000;
    // border-right:solid 1px #aaa;
    position: relative;

    // width:300px;
    text-align: left;
    overflow:hidden;
    li{
    overflow:hidden;
    // background:#39f;
    .is-active{
        background:rgb(72, 87, 106) !important;
    }
      .is-active::after{
        content:'';
        position:absolute;
        width: 4px;
        height:50px;
        right:0;
        background:#3ff;
      }
    }
    .aside{
      font-size: 13px ;
    }
    .el-submenu__title{
      font-size:13px;
    }
    
    .is-opened:hover{
      background-color: rgb(72, 87, 106) !important;
    }
    // .el-menu-item{
    //    background-color: rgb(72, 87, 106) !important;
    // }
    // .el-submenu .el-menu-item{
    //   font-size:12px;
    //   width:100% !important;
    //   min-width: auto !important;
    //   padding:0 auto !important;
    // }
    .el-menu{
      border:none;
    }
    .el-menu-item{
      font-size:12px;
    //   width:100% !important;
      min-width: auto !important;
    //   padding:0 0 0 45px !important;
    }
    .aside-menu{
    //   height:100%;
    }
    .aside-menu:not(.el-menu--collapse){
      // transition-delay: 0.38s;
      width: 220px;
      min-width: auto;
      // height:100%;
    }
    #showHidden{
    color:#eee;
    font-size:24px;position:absolute;bottom:20px;left:20px;
    transition: all .4s linear !important;
  }
}
.el-submenu__title:hover{
      background-color: rgb(72, 87, 106) !important;
    }
    .el-menu-item:hover{
      background-color: rgb(72, 87, 106) !important;
    }
</style>