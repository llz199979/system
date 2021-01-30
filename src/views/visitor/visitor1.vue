<template>
  <div class="visitor height_100">
      <!-- <canvas id="theCanvas"></canvas>  -->
  </div>
</template>

<script>
export default {
    name: 'visitor',
    data() {
        return {

        }
    },
    methods: {

    },
    mounted() {
        // let canvas = document.getElementById('theCanvas'),
        // ctx = canvas.getContext('2d'),
        // width = canvas.width = canvas.offsetWidth,
        // height = canvas.height = canvas.offsetHeight;
        // var A = 20,
        //     w = 0.02,
        //     q = 0,
        //     H = height / 2,
        //     speed = -0.08;
        // // 渐变色
        // let lingrad = ctx.createLinearGradient(0, 0, width, 0);
        // lingrad.addColorStop(0, 'rgba(0, 186, 128, 0.8)');
        // lingrad.addColorStop(1, 'rgba(111, 224, 195, 1)');
            
        // // 绘图方法
        // (function draw() {
        //     window.requestAnimationFrame(draw);
        //     ctx.clearRect(0, 0, width, height);
        //     ctx.beginPath();
        //     ctx.storkStyle = "#000";
        //     ctx.fillStyle = lingrad;
        //     ctx.lineWidth = 1;
        //     ctx.moveTo(0, height / 2);
        //     q += speed;
        //     for( let x = 0; x <= width; x ++ ) {
        //         var y = A * Math.sin(w * x + q) + H;
        //         ctx.lineTo(x, y);
        //     }
        //     ctx.lineTo(width, height);
        //     ctx.lineTo(0, height);
        //     ctx.stroke();
        //     ctx.fill();
        //     ctx.closePath();
        // }())
    }
}
</script>

<style>
#theCanvas{
    height:100%;
    width:100%;
}
.visitor{
    /* background:#333; */
}
</style>