<template>
  <div class="height_100 solid">
      <!-- 心率动画
      <div class="relative heartBeat">
        <div class="heart left"></div>
        <div class="heart right"></div>
        <div class="heart_square"></div>
      </div> -->
      <div class="tangram"></div>
      <button class="btn draw"> 测试</button>
  </div>
</template>

<script>
export default {

  data() {
    return {

    }
  },
  computed: {
    get_activeIndex() {
      return this.$store.getters.get_activeIndex;
    }
  },
  mounted() {
    // console.log(this.$router)
    // console.log(this.$route)
    // console.log(this.$store.getters.get_activeIndex)
  }
}
</script>

<style lang="scss" scoped>
.tangram{
  height:0;
  width:0;
  // content:'';
  border:solid 100px #ff0;
  border-bottom-color: red;
  border-left-color:#0c6;
  border-right-color:#49adff;
  
}
.btn{
  background:none;
  border:none;
  outline:none;
  margin:1em;padding:1em 2em;
  box-shadow: inset 0 0 0 2px #f45e61;
  color:#f45e61;
  font-weight:700;
  letter-spacing:1px;
  vertical-align: middle;
  box-sizing:border-box;
  position:relative;
  &::before, &::after{
    box-sizing:border-box;
    content:'';
    position:absolute;
    // width:100%;
    // height:100%;
    // top:0;
    // left:0;
  }
}
.draw{
  transition:color 0.25s;
}
.draw::before, .draw::after{
  border:solid 2px transparent;
  width:0;
  height:0;
}
.draw::before{
  top:0;left:0;
}
.draw::after{
  bottom:0;right:0;
}
.draw:hover{
  color:#60daaa;
}
.draw:hover::before, .draw:hover::after{
  width:100%;
  height:100%;
}
.draw:hover::before{
  border-top-color:#60daaa;
  border-right-color:#60daaa;
  transition: width 0.25s ease-out, height 0.25s ease-out 0.25s;
}
.draw:hover::after{
  border-bottom-color:#60daaa;
  border-left-color:#60daaa;
  transition: border-color 0s ease-out 0.5s, width 0.25s ease-out 0.5s, height 0.25s ease-out 0.75s;
}
.heartBeat{
  border:solid 1px;
  margin:80px auto;
  height:200px;
  width:200px;

  .heart{
    position:absolute;
    height:100px;
    width:100px;
    border-radius:50%;
   background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%);
    animation: beat 2s linear infinite;
  }
  .heart_square{
    background:linear-gradient(-45deg,#B80734 0%,#d5093c 40%);
    height:97px;
    width:97px;
    position:absolute;
    top:42px;
    left:41px;
    z-index:2;
    animation: beat 2s linear infinite;
  }
  .left{
    z-index:11;
  }
  .right{
    z-index:10;
    right:20px;
  }
  @keyframes beat {
    0%{
      transform: scale(1) rotate(225deg);
      box-shadow: 0 0 40px #d5093c;
    }
    50%{
      transform:scale(1.2) rotate(225deg);
      box-shadow: 0 0 70px #d5093c;
    }
    100%{
      transform:scale(1) rotate(225deg);
      box-shadow: 0 0 40px #d5093c;
    }
  }
}
</style>