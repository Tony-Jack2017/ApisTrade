<template>
  <canvas id="apis-trade-view" @wheel="handleWheel">
  </canvas>
</template>


<script>
import { getPixelRatio, throttle } from "./util/index"

  export default {
    data() {
      return {
        canvas: null,
        context: null,
        curXLen: 0,
        dateList: [
          '08:00', '08:01', '08:02', '08:03',
          '08:04', '08:05', '08:06', '08:07',
          '08:08', '08:09', '08:10', '08:11'
        ]
      }
    },
    methods: {
      // init
      init() {
        this.canvas = document.getElementById('apis-trade-view')
        this.context = this.canvas.getContext('2d')
        this.raito = getPixelRatio(this.context)
      },
      resetCanvasSize() {
        const parentNode = this.canvas.parentNode
        this.canvas.width = parentNode.offsetWidth * this.raito
        this.canvas.height = parentNode.offsetHeight * this.raito
        this.canvas.style.width = parentNode.offsetWidth + 'px';
        this.canvas.style.height = parentNode.offsetHeight + 'px';
      },
      drawBackground() {
        this.bgContext = this.canvas.getContext('2d')
        this.bgContext.fillStyle = '#1d1f2d'
        this.bgContext.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },

      // draw
      drawDateAxis(dateList, curLength, mouseX){
        const interval = curLength / dateList.length
        const ratio = mouseX / this.canvas.width
        const start = mouseX - curLength * ratio
        this.handleDateAxis(dateList, start, interval)
      },

      // handler
      handleDateAxis(dateList, start, interval) {
        this.context.font = "24px san-serif";
        this.context.fillStyle = 'white'
        dateList.forEach(date => {
          this.context.fillText(date, start, this.canvas.height - 20)
          this.context.beginPath()
          this.context.moveTo(start + 32, 0)
          this.context.lineTo(start + 32, this.canvas.height - 50)
          this.context.strokeStyle = '#61636d'
          this.context.stroke()
          start += interval
        })
      },

      // event
      handleWheel(event) {
        throttle(() => {
          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
          this.context.fillStyle = '#1d1f2d'
          this.context.fillRect(0, 0, this.canvas.width,this.canvas.height)
          this.context.fillRect(this.canvas.width - 100, 0, 100, this.canvas.height - 150)
          this.context.fillStyle = '#1d1f2d'
          this.context.fillRect(0, this.canvas.height - 100, this.canvas.width ,100)
          this.curXLen -= (event.deltaY * 10)
          const mouseX = event.offsetX * this.raito
          this.drawDateAxis(this.dateList,this.curXLen, mouseX)
        }, 100)()
      },

    },
    mounted() {
      this.init()
      this.resetCanvasSize()
      this.drawBackground()
      this.curXLen = this.canvas.width
      console.log(this.curXLen)
      this.drawDateAxis(this.dateList, this.curXLen, 0)
    }
  }
</script>

<style></style>
