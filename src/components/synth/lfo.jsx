import React, { Component, PropTypes } from 'react'

export default class LFO extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (lfo) => { console.log(lfo) },
  }

  static value2freq(value) {
    return (value / 4) + 0.001
  }

  static value2depth(value) {
    return value / 127 // 0-1.0
  }

  constructor(props) {
    super(props)
    this.state = {
      frequency: 0, // 0-127
      actualFrequency: 0,
      depth: 0, // 0-127
      actualDepth: 0,
      type: 'sine',
    }

    this.lfo = null
  }

  componentWillMount() {
    this.lfo = this.props.audioCtx.createOscillator()
    this.lfo.frequency.value = 8.0
    this.lfo.type = 'sine'
    this.props.onReady(this.lfo) // onReadyを介して親componentでgainNodeに接続させる
    this.lfo.start()
  }

  set frequency(frequency) {
    const actualFrequency = LFO.value2freq(frequency)
    this.lfo.frequency.vcalue = actualFrequency
    this.setState({ frequency, actualFrequency })
  }

  set depth(depth) {
    const actualDepth = LFO.value2depth(depth)
    // TOOD: set actualDepth to node
    this.setState({ depth, actualDepth })
  }

  render() {
    return (<div>
      <h2>LFO</h2>
      <div>frequency: {this.state.actualFrequency} Hz</div>
      <div>depth: {this.state.actualDepth}</div>
    </div>)
  }
}
