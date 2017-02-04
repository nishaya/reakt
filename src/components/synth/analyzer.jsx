import React, { Component, PropTypes } from 'react'

const WIDTH = 200
const HEIGHT = 200

export default class AnalyzerComponent extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext),
  }

  static defaultProps = {
    audioCtx: null,
  }

  componentDidMount() {
    console.log('componentDidMount', this.props)
    if (this.props.audioCtx) {
      this.analyzer = this.props.audioCtx.createAnalyser()
      console.log(this.analyzer)
      this.draw()
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps)
    if (!this.props.audioCtx && nextProps.audioCtx) {
      this.analyzer = nextProps.audioCtx.createAnalyser()
      this.draw()
    }
  }

  draw() {
    const bufferLength = this.analyzer.fftSize
    const dataArray = new Uint8Array(bufferLength)
    this.analyzer.getByteTimeDomainData(dataArray)
    const canvasCtx = this.canvas.getContext('2d')
    canvasCtx.fillStyle = 'rgb(200, 200, 200)'
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT)
    canvasCtx.lineWidth = 2
    canvasCtx.strokeStyle = 'rgb(0, 0, 0)'
    canvasCtx.beginPath()
    const sliceWidth = (WIDTH * 1.0) / bufferLength
    let x = 0
    for (let i = 0; i < bufferLength; i += 1) {
      const v = dataArray[i] / 128.0
      const y = (v * HEIGHT) / 2
      if (i === 0) {
        canvasCtx.moveTo(x, y)
      } else {
        canvasCtx.lineTo(x, y)
      }
      x += sliceWidth
    }
    canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2)
    canvasCtx.stroke()

    const draw = this.draw.bind(this)
    setTimeout(draw, 1000)
  }

  render() {
    return (<div>
      analyzer
      <canvas ref={canvas => this.canvas = canvas} />
    </div>)
  }
}
