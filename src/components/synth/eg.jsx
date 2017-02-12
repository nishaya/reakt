import React, { Component, PropTypes } from 'react'
import Slider from 'material-ui/Slider'

export default class EG extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static ATTACK_OFFSET = 0.001

  static defaultProps = {
    onReady: (generateEnvelopFunc, setReleaseFunc) => {
      console.log(generateEnvelopFunc, setReleaseFunc)
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      attack: 0,
      decay: 0.1,
      sustain: 0.5,
      release: 0.5,
    }
  }

  // setup & connect filter
  componentWillMount() {
    this.props.onReady(
      this.generateEnvelop.bind(this),
      this.setRelease.bind(this),
    )
  }

  setRelease(gain) {
    const now = this.props.audioCtx.currentTime
    const releaseTime = now + this.state.release + 0.0001
    gain.gain.cancelScheduledValues(0)
    gain.gain.linearRampToValueAtTime(
      0,
      releaseTime,
    )
    return releaseTime
  }

  generateEnvelop(gain, volume = 1.0) {
    const gainNode = gain || this.props.audioCtx.createGain()
    const now = this.props.audioCtx.currentTime
    const attackTime = now + this.state.attack + EG.ATTACK_OFFSET
    const decayTime = attackTime + this.state.decay
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(
      1.0 * volume,
      attackTime,
    )
    gainNode.gain.linearRampToValueAtTime(
      this.state.sustain * volume,
      decayTime,
    )
    return gainNode
  }

  static PARAMS = {
    attack: {
      min: 0,
      max: 10,
    },
    decay: {
      min: 0,
      max: 10,
    },
    sustain: {
      min: 0,
      max: 1.0,
    },
    release: {
      min: 0,
      max: 10,
    },
  }

  renderSlider(key) {
    return (<div>
      {key} : {this.state[key]}
      <Slider
        key={`slider_${key}`}
        min={EG.PARAMS[key].min}
        max={EG.PARAMS[key].max}
        step={(EG.PARAMS[key].max - EG.PARAMS[key].min) / 127}
        value={this.state[key]}
        onChange={(e, value) => { this.setState({ [key]: value }) }}
      />
    </div>)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>EG</h2>
      <div className="reakt-component__body">
        {this.renderSlider('attack')}
        {this.renderSlider('decay')}
        {this.renderSlider('sustain')}
        {this.renderSlider('release')}
      </div>
    </div>)
  }
}
