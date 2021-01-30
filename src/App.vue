<template>
  <div id="app" class="height_100">
    <router-view/>
  </div>
</template>
<style lang="scss">
// @import url('./assets/css/font.css');
@import url('./assets/css/app.scss');
@import url('./assets/iconfont/iconfont.css');
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-form{
  label{
    position:relative;
  }
  .el-form-item__label:before{
    font-size:16px;
    position:absolute;
    left:-10px;
  }
}
//   *::-webkit-scrollbar {width:6px; height:6px; background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
// *::-webkit-scrollbar-track {background-color:#f0f6ff;  } /*定义滚动条轨道 内阴影+圆角*/
// *::-webkit-scrollbar-thumb {background-color:#c1c1c1; border-radius:6px;} /*定义滑块 内阴影+圆角*/

// .scrollbarHide::-webkit-scrollbar{display: none}
// .scrollbarShow::-webkit-scrollbar{display: block}
</style>
