<!--头部菜单栏面包屑 -->
<template>
  <div class="relative" style="background:#fff;overflow:hidden;margin-left:2px;">
    <ul id="breadcrumb" class="refuseCopy relative">
    <router-link tag="li" to="/" 
    :class="[{'is-active':activePath == '/nav' }, 'bread']">
      {{ $t('m.header.home') }}
      <!-- <i class="el-icon-error"></i> -->
    </router-link>
    <router-link style="" :class="[{'is-active':activePath == v.path }, 'bread']"
     tag="li" :to="v.path" v-for="(v, i) in getBreadList" :key="i">
      {{  $t(v.name) }}
      <i class="el-icon-close" style="" @click.stop="deleteBread(i)
      "></i>
    </router-link>
    </ul>
    <i style="position:absolute;right:14px;top:4px;">
      <el-color-picker
        :predefine="predefineColors"
        class="theme-picker"
        popper-class="theme-picker-dropdown"
        v-model="theme"
        size="mini" @change="themeChange"
    >
    </el-color-picker>
    </i>
  </div>
</template>

<script>
export default {
  name: 'breadcrumb',
  data() {
      return {
          infoVisible: false,
          theme: '#409eff',
          activePath: '',
          predefineColors: [
            '#ff4500',
            // '#ff8c00',
            // '#ffd700',
            // '#90ee90',
            '#00ced1',
            '#1e90ff',
            '#0E80F7',
            '#c71585',
            // 'rgba(255, 69, 0, 0.68)',
            'rgb(255, 120, 0)',
            // 'hsv(51, 100, 98)',
            // 'hsva(120, 40, 94, 0.5)',
            // 'hsl(181, 100%, 37%)',
            // 'hsla(209, 100%, 56%, 0.73)',
            '#c7158577',
            '#545c64'
          ]
      }
    },
    watch: {
      $route: {
        handler: function(val, oldVal) {
          this.activePath = val.path;
        }
      }
    },
    computed: {
      getBreadList() { //获得面包屑列表
        return this.$store.getters.getBreadList;
      }
    },
    mounted() {
      this.activePath = window.location.pathname;
      if(window.location.pathname != '/nav'){

        let bread = {
          name: this.$route.meta.title,
          path: this.$route.path
        }
        this.$store.commit('set_breadList', bread);
      }
    },
    methods: {
      deleteBread(index) {

        this.$store.commit('delete_breadList', index);
        let breadList = this.getBreadList;

        if(breadList.length) {
          if(breadList.length == index){
            // this.activePath = breadList[index - 1].path;       
            this.$router.push(breadList[index - 1].path)
          }else{
            // this.activePath = breadList[index].path;
            this.$router.push(breadList[index].path)
          }
          // this.activePath = breadList[index].path;
        }else{
           this.$router.push('/')
        }
      },
      themeChange(v) {
        if(v) {
          this.$store.commit('themeChange', v)
        }
      }
    }
}
</script>
<style lang="scss" scoped>
#breadcrumb{
  margin: 4px 10px 6px;
  padding:6px 10px 0;
  border-bottom:solid 1px #438eb9;
  text-align:left;
  width:calc(100% - 80px);
  white-space: nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  .bread{
    display:inline-block;
    position:relative;
    padding:4px 20px 2px 17px;
    margin-right:10px;
    background:#fff;
    box-shadow: 0 0 4px #aaa;
    // border:solid 1px #bbb;
    font-size:12px;
    color:#444;
    &:hover{
      background:#49adff;
      color:#fff;
      cursor:pointer;
    }
    i{
      position:absolute;
      right:4px;top:4px;
    }
  }
  .is-active{
    background:#39f;
    color:#fff;
    font-size:12px;
    letter-spacing: 1px;
  }
}
</style>
