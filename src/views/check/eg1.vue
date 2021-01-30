<template>
  <div class="height_100 eg1">
    <!-- <canvas id="snowCanvas"></canvas> -->
    <!-- <div class="mainContainer">
    </div> -->
    <div class="chest">
      <div class="heart left sided top"></div>
      <div class="heart center"></div>
      <div class="heart right sided"></div>
    </div>
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
  //   var div = document.querySelector('.eg1');
  //   var c = document.getElementById('snowCanvas'), 
  //   $ = c.getContext("2d"),
	//   w = c.width = div.clientWidth, 
  //   h = c.height = div.clientHeight;
  //   function makeItSnow() {
  //     var snow,  
  //       arr = [],
  //       num = 800, // 雪的个数
  //       tsc = 2,   // 周期的倒数 sin(tsc * x);
  //       sp = 1,    // 雪花飘落的速度
  //       sc = 1.3, 
  //       t = 0, 
  //       mv = 20, 
  //       min = 1,   // 雪花飘落的最小速度
  //       f;
  //     for (var i = 0; i < num; ++i) {
  //         snow = new Flake();
  //         snow.y = Math.random() * (h + 50);  //雪的纵坐标
  //         snow.x = Math.random() * w;         //雪的横坐标
  //         snow.t = Math.random() * (Math.PI * 2); // 路径长度？周期数
  //         snow.sz = (100 / (10 + (Math.random() * 100))) * sc; // 雪花的大小 | 半径
  //         snow.sp = (Math.pow(snow.sz * .8, 2) * .15) * sp;    //.越大 的雪花下落速度越快
  //         snow.sp = snow.sp < min ? min : snow.sp;             //雪花的最小速度为一
  //         arr.push(snow);
  //       }
  //       go();
  //       function go(){
  //       window.requestAnimationFrame(go);
  //         $.clearRect(0, 0, w, h);  //清除画布
  //         $.fillRect(0, 0, w, h);   //画个方形
  //         $.fill();
  //           for (var i = 0; i < arr.length; ++i) {
  //             f = arr[i];
  //             f.t += .05;
  //             f.t = f.t >= Math.PI * 2 ? 0 : f.t;
  //             f.y += f.sp; // 雪花的下落Y坐标
  //             f.x += Math.sin(f.t * tsc) * (f.sz * .3); //雪花x = Asin(wx + q) + x0;
  //             if (f.y > h + 50) f.y = -10 - Math.random() * mv;
  //             if (f.x > w + mv) f.x = - mv;
  //             if (f.x < - mv) f.x = w + mv;
  //             f.draw();
  //         }
  //     }
  //     function Flake() {
  //       this.draw = function() {
  //         //  console.log(this)
  //         this.g = $.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.sz);
  //         this.g.addColorStop(0, 'hsla(255,255%,255%,1)');
  //         this.g.addColorStop(1, 'hsla(255,255%,255%,0)');
  //         $.moveTo(this.x, this.y);
  //         $.fillStyle = this.g;
  //         $.beginPath();
  //         $.arc(this.x, this.y, this.sz, 0, Math.PI * 2, true); //true 为逆时针
  //         $.fill();
  //       }
  //     }
  //   }
  //   window.addEventListener('resize', function(){
  //     c.width = w = window.innerWidth;
  //     c.height = h = window.innerHeight;
  //   }, false);
  
  // makeItSnow();
  }
}
</script>

<style scoped>
@import url('../../assets/css/snow.scss');
.eg1 {
  /* margin:8px; */
/* background: radial-gradient(#a8e063, #56ab2f); */
/* color:#fff; */
	/* background:#ffa5a5; */
}
.chest {
	width:500px;
	height:500px;
	margin:0 auto;
	position:relative;
}
.heart {
	position:absolute;
	z-index:2;
	background:linear-gradient(-90deg,#F50A45 0%,#d5093c 40%);
	animation:beat 2s ease 0s infinite normal;
}
.heart.center {
	background:linear-gradient(-45deg,#B80734 0%,#d5093c 40%);
}
.heart.top {
	z-index:3;
}
.sided {
	top:100px;
	width:220px;
	height:220px;
	border-radius:110px;
}
.center {
	width:210px;
	height:210px;
	bottom:100px;
	left:145px;
	transform:rotateZ(225deg);
}
.left {
	left:62px;
}
.right {
	right:62px;
}
@keyframes beat {
	0% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
50% {
	transform:scale(1.1) rotate(225deg);
	box-shadow:0 0 70px #d5093c;
}
100% {
	transform:scale(1) rotate(225deg);
	box-shadow:0 0 40px #d5093c;
}
}
.meteor {
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    transform: rotateZ(45deg);
    transform: -webkit-rotateZ(45deg);
}
.star {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 2px;
    background: linear-gradient(45deg,rgba(255,255,255,0),#729ff1);
    background: -webkit-linear-gradient(45deg,rgba(255,255,255,0),#729ff1);
    /*此处为下一步的添加动画*/
    -webkit-animation: tail 3s ease-in-out infinite,shooting 3s ease-in-out infinite;
    -o-animation: tail 3s ease-in-out infinite,shooting 3s ease-in-out infinite;
    animation: tail 3s ease-in-out infinite,shooting 3s ease-in-out infinite;
}
.star::before,
.star::after{
    content: "";
    position: absolute;
    top: calc(100% - 1px);
    left: 100%;
    height: 2px;
    background: linear-gradient(45deg,rgba(255,255,255,0),#729ff1,rgba(255,255,255,0));
    background: -webkit-linear-gradient(45deg,rgba(255,255,255,0),#729ff1,rgba(255,255,255,0));
    /*此处为下一步的添加动画*/
    -webkit-animation: shining 3s ease-in-out infinite;
    -o-animation: shining 3s ease-in-out infinite;
    animation: shining 3s ease-in-out infinite;
}
.star:before {
    transform: translateX(-50%) rotateZ(-45deg);
    transform: -webkit-translateX(-50%) -webkit-rotateZ(-45deg);
}
.star:after {
    transform: translateX(-50%) rotateZ(45deg);
    transform: -webkit-translateX(-50%) -webkit-rotateZ(45deg);
}
@-webkit-keyframes shining {
    0% {width: 0;}
    50% {width: 30px;}
    100% {width: 0;}
}
@keyframes shining {
    0% {width: 0;}
    50% {width: 30px;}
    100% {width: 0;}
}
@-webkit-keyframes tail {
    0% {width: 0;}
    30% {width: 100px;}
    100% {width: 0;}
}
@keyframes tail {
    0% {width: 0;}
    30% {width: 100px;}
    100% {width: 0;}
}
@-webkit-keyframes shooting {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
    100% {
        -webkit-transform: translateX(300px);
        transform: translateX(300px);
    }
}
@keyframes shooting {
    0% {
        -webkit-transform: translateX(0);
        transform: translateX(0);
    }
    100% {
        -webkit-transform: translateX(300px);
        transform: translateX(300px);
    }
}

</style>