import React, { Component, PropTypes } from 'react'
import Slider from 'material-ui/Slider'

export default class EG extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    label: PropTypes.string,
  }

  static ATTACK_OFFSET = 0.0001
  static PARAMS = {
    attack: {
      label: 'Attack Time',
      min: 0,
      max: 3,
    },
    decay: {
      label: 'Decay Time',
      min: 0,
      max: 3,
    },
    sustain: {
      label: 'Sustain Level',
      min: 0,
      max: 1.0,
    },
    release: {
      label: 'Release Time',
      min: 0,
      max: 3,
    },
  }

  static defaultProps = {
    onReady: (generateEnvelopFunc, setReleaseFunc) => {
      console.log(generateEnvelopFunc, setReleaseFunc)
    },
    label: 'EG',
  }

  constructor(props) {
    super(props)
    this.state = {
      attack: 0,
      decay: 0.1,
      sustain: 0.8,
      release: 0.3,
    }
  }

  // setup & connect filter
  componentWillMount() {
    this.props.onReady(
      this.generateEnvelop.bind(this),
      this.setRelease.bind(this),
      this.setControlChange.bind(this),
    )
  }

  setControlChange(paramName, value) {
    this.setState({
      [paramName]: EG.PARAMS[paramName].min
        + value / 127 * (EG.PARAMS[paramName].max - EG.PARAMS[paramName].min),
    })
  }

  setRelease(gain) {
    const now = this.props.audioCtx.currentTime
    const releaseTime = now + this.state.release + 0.001
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

  renderSlider(key) {
    return (<div>
      {EG.PARAMS[key].label} : {parseInt(this.state[key] * 100, 10) / 100}
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
      <h2>{this.props.label}</h2>
      <div className="reakt-component__body">
        {this.renderSlider('attack')}
        {this.renderSlider('decay')}
        {this.renderSlider('sustain')}
        {this.renderSlider('release')}
      </div>
    </div>)
  }
}
