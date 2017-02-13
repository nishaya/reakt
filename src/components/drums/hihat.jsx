import React, { Component, PropTypes } from 'react'
import NoiseGenerator from 'utils/noise_generator'

export default class Hihat extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
  }

  static defaultProps = {
    onReady: (triggerFunc) => { console.log(triggerFunc) },
    attack: 0,
    decay: 0.1,
    sustain: 0.5,
    release: 0.3,
  }

  componentDidMount() {
    this.props.onReady(this.trigger.bind(this))
    this.buffer = NoiseGenerator.generateWhiteNoise(this.props.audioCtx)
  }

  trigger(velocity) {
    console.log('trigger hihat', velocity)
    const bufferSource = this.props.audioCtx.createBufferSource()
    const volume = velocity / 127

    const gain = this.props.audioCtx.createGain()
    const now = this.props.audioCtx.currentTime
    const attack = now + this.props.attack
    const decay = attack + this.props.decay
    const release = decay + this.props.release
    gain.gain.value = volume
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(volume, attack)
    gain.gain.linearRampToValueAtTime(volume * this.props.sustain, decay)
    gain.gain.linearRampToValueAtTime(0, release)
    gain.connect(this.props.audioCtx.destination)

    bufferSource.buffer = this.buffer
    bufferSource.connect(gain)
    bufferSource.loop = true
    bufferSource.start()
    bufferSource.stop(now + attack + release)
  }

  render() {
    return (<div className="reakt-drum__container">
      <h3>Hihat</h3>
      <div>
        hihat
      </div>
    </div>)
  }
}
