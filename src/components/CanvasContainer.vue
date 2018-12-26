<template>
  <div class="canvas-container">
    <canvas
      ref="canvas"
      @mousemove="onMouseMove"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseout="onMouseOut"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      drawing: false
    }
  },
  computed: {
    ...mapState(['data', 'remoteId'])
  },
  watch: {
    data(value) {
      this.draw(value)
    },
    remoteId() {
      this.context.clearRect(
        0,
        0,
        this.$refs.canvas.offsetWidth,
        this.$refs.canvas.offsetHeight
      )
    }
  },
  mounted() {
    this.$refs.canvas.setAttribute('width', this.$el.offsetWidth)
    this.$refs.canvas.setAttribute('height', this.$el.offsetHeight)
    this.context = this.$refs.canvas.getContext('2d')
  },
  methods: {
    onMouseDown() {
      this.drawing = true
    },
    onMouseUp() {
      this.drawing = false
    },
    onMouseOut() {
      this.drawing = false
    },
    onMouseMove(e) {
      const rect = this.$refs.canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      this.current = { x, y }
      const data = { previous: this.previous, current: this.current }
      if (this.drawing) {
        this.draw(data)
        this.send({ data })
      }
      this.previous = this.current
    },
    draw({ previous, current }) {
      if (!previous) {
        return
      }
      this.context.beginPath()
      this.context.moveTo(previous.x, previous.y)
      this.context.lineTo(current.x, current.y)
      this.context.strokeStyle = 'black'
      this.context.lineWidth = 2
      this.context.stroke()
      this.context.closePath()
    },
    ...mapActions(['send'])
  }
}
</script>

<style scoped>
.canvas-container {
  width: 100%;
  height: 100%;
}
canvas {
  background-color: white;
}
</style>
