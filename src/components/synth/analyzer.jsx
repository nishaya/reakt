import React, { Component, PropTypes } from 'react'

const WIDTH = 256
const HEIGHT = 100

export default class AnalyzerComponent extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (analyzer) => { console.log(analyzer) },
  }

  componentDidMount() {
    this.analyzer = this.props.audioCtx.createAnalyser()
    this.props.onReady(this.analyzer)
    this.draw()
  }

  draw() {
    this.analyzer.fftSize = 1024
    const bufferLength = this.analyzer.fftSize
    const dataArray = new Uint8Array(bufferLength)
    this.analyzer.getByteTimeDomainData(dataArray)
    const canvasCtx = this.canvas.getContext('2d')
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT)
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
    setTimeout(draw, 30)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Analyzer</h2>
      <div className="reakt-component__body">
        <canvas
          ref={(canvas) => { this.canvas = canvas }}
          width={WIDTH}
          height={HEIGHT}
        />
      </div>
    </div>)
  }
}
