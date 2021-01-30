<!-- 主览页 -->
<template>
  <div id="home" class="height_100" >
    <Header></Header>
    <el-container class="container animated fadeIn slideInUp">
      <el-container class="container_">
        <Sidebar></Sidebar>
        <Main></Main>
        <!-- {{get_router}} -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/sidebar';
import Main from '@/components/Layout/Main';
// import breadcrumb from '@/components/Layout/breadcrumb';
export default {
  name: 'home',
  components: {
    HelloWorld,
    Header,
    Sidebar,
    Main
  },
  computed: {
    // get_router() {
    //   return this.$router;
    // }
  },
  mounted() {
    console.log(this.$router)
  }
}
</script>
<style lang="scss" scoped>
#home{

  .container{
    width:100%;
    // padding:8px;
    height:calc(100% - 42px);
    background:rgb(245,247,249);
    .container_ {
      height:100%;
      // border:solid 1px;
      background:#fff;
      box-shadow:-2px 0px 4px #aaa;
    }
  }
}
</style>
