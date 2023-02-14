<template>
  <canvas id="apis-trade-view">
  </canvas>
</template>


<script>
import {getPixelRatio, throttle} from "./util/index"

export default {
  data() {
    return {
      canvas: null,
      context: null,
      curXLen: 0,
      dateList: [
        '08:00', '08:01', '08:02', '08:03',
        '08:04', '08:05', '08:06', '08:07',
        '08:08', '08:09', '08:10', '08:11',
        '08:12', '08:13', '08:14', '08:15',
      ],
      valueList: [
          {x: 0, y:300}
      ]
    }
  },
  methods: {

    // handler
    handleDateAxis(dateList, start, interval) {
      this.context.font = "24px san-serif";
      this.context.fillStyle = '#61636d'
      this.context.beginPath()
      this.context.lineWidth = 2
      this.context.moveTo(0, this.canvas.height - 70)
      this.context.lineTo(this.canvas.width, this.canvas.height - 70)
      this.context.strokeStyle = 'white'
      this.context.stroke()
      dateList.forEach(date => {
        this.context.fillText(date, start, this.canvas.height - 20)
        this.context.beginPath()
        this.context.lineWidth = 2
        this.context.moveTo(start + 32, this.canvas.height - 70)
        this.context.lineTo(start + 32, this.canvas.height - 50)
        this.context.strokeStyle = 'white'
        this.context.stroke()
        start += interval
      })
    },
    handleValue(valueList){
      this.context.moveTo(this.valueList[0].x, this.valueList[0].y)
      this.context.lineWidth = 5
      this.context.lineCap = 'round'
      this.context.lineJoin = 'round'
      valueList.forEach(value => {
        this.context.lineTo(value.x, value.y)
      })
      this.context.strokeStyle = 'rgb(0,' + Math.floor(255-42.5) + ',' +
          Math.floor(255-42.5) + ')';
      this.context.stroke()
      this.context.moveTo(this.valueList[this.valueList.length - 1].x,  this.valueList[this.valueList.length - 1].y)
      this.context.lineTo(this.valueList[this.valueList.length - 1].x, this.canvas.height - 100)
      this.context.lineTo(this.valueList[0].x, this.canvas.height - 100)
      this.context.lineTo(this.valueList[0].x,  this.valueList[0].y)
      var lingrad = this.context.createLinearGradient(0,0,0,900);
      lingrad.addColorStop(0, '#00ABEB');
      lingrad.addColorStop(1, '#26C000');
      this.context.fillStyle = lingrad
      this.context.fill()
    },

    // draw
    drawDateAxis(dateList, curLength, start) {
      const interval = curLength / 16
      const done = () => {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillStyle = '#1d1f2d'
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
        this.context.fillRect(this.canvas.width - 100, 0, 100, this.canvas.height - 150)
        this.context.fillStyle = '#1d1f2d'
        this.context.fillRect(0, this.canvas.height - 100, this.canvas.width, 100)
        this.handleDateAxis(dateList, start, interval)
        start -= 1
        this.dateList.push('08:--')
      }
      return done
    },
    drawValue(){
      this.handleValue(this.valueList)
    },

    // action
    animation() {
      let end
      let length = 0
      const done = this.drawDateAxis(this.dateList, this.curXLen, 0)
      let time = setInterval(() => {
        let random = Math.random(1)
        if (random < 0.5 ) {
          random = -random * Math.random(10) * 100
        }else {
          random = random * Math.random(10) * 100
        }
        if(end) {
          clearInterval(end)
          end = null
        }else {
          end = setInterval(() => {
            done()
            this.drawValue()
            length += 0.5
            this.valueList.push({
              x: length,
              y: 300 + random
            })
            if(length > this.canvas.width) {
              this.valueList.shift()
              this.valueList.forEach(value => {
                value.x -= 0.5
              })
            }
          }, 17)
        }
        if(this.dateList >= 30) {
          this.dateList.shift()
        }
      }, 1000)
    },

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

  },
  mounted() {
    this.init()
    this.resetCanvasSize()
    this.drawBackground()
    this.curXLen = this.canvas.width
    this.animation()
  }
}
</script>

<style></style>
