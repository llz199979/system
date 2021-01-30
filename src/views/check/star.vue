<template>
  <div class="star relative height_100" style="overflow: hidden;">
    <!-- <audio class="mp3" autoplay src="../../assets/mp3/G.E.M.邓紫棋 - 光年之外(bq).mp3"></audio> -->
    <!-- <embed src="./mp3/G.E.M.邓紫棋 - 光年之外(bq).mp3"> -->
    <div class="swing swingLeft"></div>
    <div class="swing swingRight"></div>
    <div class="flexLayout">
        <!-- <span class="headPhotoBorder"><img class="headPhoto" src="../../assets/img/3.jpg"></span> -->
        <!-- <img src="../../assets/img/loading.png" alt=""> -->
        <div :class="[{'scale': scaleI == i}, 'imagesWrapper']" v-for="(v, i) in image" :key="i">
          <img :class="[ 'headPhoto', 'images']"
          @click="scale(i)" src="../../assets/img/2.png">
        </div>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <!-- <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i> -->
        <!-- <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i>
        <i class="makeNumber"></i> -->
    </div>
      <img v-if="animationVisible" class="loading"
      src="../../assets/img/loading.png">
    <div v-if="animationVisible"  :class="[{'showCard':animationVisible},'card']">
        <img class="avatar" src="../../assets/img/4.jpg" alt="" srcset="">
        <ul class="memberInfo">
            <li>小明同学</li>
            <li>今日第<span class="number">9</span>位签到</li>
            <li class="coming">闪亮登场</li>
        </ul>
    </div>
    
    
    <!-- <span style="color:#fff;">{{animationVisible}}</span> -->
    <!-- <img v-if="animationVisible" :class="[{'rotate':animationVisible},'loading']"
     src="../../assets/img/loading.png"> -->
     
    <el-button @click.prevent="animationStar">动画开始</el-button>
    <el-button>人物添加{{src}}</el-button>
    
    <!-- <video ref="mediaVideo" :src="src"></video> -->
    <div class="light"></div>
    <div class="box"></div>
    <img class="images" src="../../assets/img/2.png" style="">
  </div>
</template>

<script>
export default {

  data() {
    return {
      animationVisible: false,
      scaleI: '',
      image: 17,
      src: ''
    }
  },
  computed: {
  },
  mounted() {
    var opt = {
      audio: true,
      video: {
        width: '100%',
        height: '100%'
      }
    }
    // navigator.mediaDevices.getUserMedia(opt)
    // .then(function(mediaStream) {
    //  var video = document.querySelector('video');
    //  video.srcObject = mediaStream;
    //  video.onloadedmetadata = function(e) {
    //   video.play();
    //  };
    // })
    // .catch(function(err) {
    //  console.log(err.name + ": " + err.message);
    // });
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    animationStar() {
      this.animationVisible = true;
      this.timer = setTimeout(() => {
        this.animationVisible = false;
        // this.image ++; 
        this.scaleI = this.image ++; 
        console.log(this.scaleI);
      },4000)
    },
    cancalAnimation() {
      this.scaleI = '';
    },
    scale(i){
      this.scaleI = i;
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('../../assets/css/animation.scss');
.imagesWrapper{
  padding:4px;
  mask-image: url('../../assets/img/star.png');
   mask-size: 100% 100%;
   background:#fff;
   
  //  box-shadow:  0 0 10px 10px #aaa;
  // background-size: 100% 100%;
  margin: 0 10px;
}
.images{
  // background-image: url('../../assets/img/6.jpg');
  // background:url('../../assets/img/4.jpg');
  // border:solid 1px #fff;
  // box-shadow:inset 0 0 10px 20px #aaa;

  margin-top:2px;
  background:#fff;
  mask-image: url('../../assets/img/star.png');
  box-shadow: inset 0 0 10px 10px #aaa;
  // mask-border: url('../../assets/img/2.png') ;
  mask-size: 100% 100%;
  background-size: 100% 100%;
  height:120px;width:120px;
  
  // margin:0 auto;
}
.box {
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  background-color: #ccc;
  transition: all .5s ease;
  background: #ccc linear-gradient(to right, blue, blue) no-repeat center bottom;
  background-size: 0 2px;
  background-position: center bottom;
}

.box:hover {
  background-size: 100% 2px;
} 
.star{

  box-sizing: border-box;
  // margin:0 10px 0;
  width:100%;
  overflow-y:auto;
  background-image: url("../../assets/img/6.jpg");
  background-size: 100%;
  background-size: 100% 100%;
  .flexLayout{
    width:100%;
    border:solid 1px #fff;
    display:flex;
    
    justify-content:space-around;
    flex-wrap: wrap;
    .makeNumber{ //凑数
      width:120px;
      display: inline-block;
      margin:0 14px;
    }
  }
  .scale{
    // transition: all 0.4s ease-in-out;
    // transform: scale(1.5);
    animation: scaleImg 1s ease-in-out;
  }
}
@keyframes scaleImg{
  0%{
    transform:scale(1);
  }
  50%{
    transform:scale(1.5);
  }
  100%{
    transform:scale(1);
  }
}
.light{
  height:100px;
  width:100px;
  border-radius:50%;
  opacity: 0.9;
  margin:0 auto;
  background:#fff;  
  box-shadow: 0 0 20px 0 #ff0 ,inset 0 0 40px 10px #ff0;
  animation:lighting 10s linear infinite;
}
@keyframes lighting{
  0%{
    transform: rotateX(0);
    box-shadow: 0 0 20px 10px #ff0 ,inset 0 0 80px 10px #ff0;
  }
  50%{
    transform: rotateX(100deg);
    box-shadow: 0 0 40px 20px #ff0 ,inset 0 0 20px 10px #ff0;
  }
  100%{
    transform: rotateX(360deg);
    box-shadow: 0 0 20px 10px #ff0 ,inset 0 0 80px 10px #ff0;
  }
}
</style>