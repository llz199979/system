<!--中心内容-->
<template>
  <el-main id="Main">
    <breadcrumb></breadcrumb>
    <div id="router_view">
        <router-view />
    </div>
</el-main>
</template>
 
<script>
import breadcrumb from '@/components/Layout/breadcrumb';
export default {
    name: 'Main',
    components: {
    breadcrumb
  },
}
</script>

<style lang="scss">
#Main{
    height:100%;
    // height:calc(100% - 10px);
    width:50%;
    padding:0;
    // background:#f5f5f5;
    #router_view{
      margin:4px 8px;
        height:calc(100% - 50px);
        // background:rgb(240,242,245);
        
        // box-shadow:  0 0 3px #aaa;
        
        // border:solid 1px;
    }
}
</style>