import React, { Component, PropTypes } from 'react'

export default class LFO extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (lfo) => { console.log(lfo) },
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

  render() {
    return (<div>
      <h2>LFO</h2>
      <div>frequency: {this.state.actualFrequency}</div>
      <div>depth: {this.state.actualDepth}</div>
    </div>)
  }
}
