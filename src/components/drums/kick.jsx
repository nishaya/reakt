import React, { Component, PropTypes } from 'react'
import PausedIcon from 'material-ui/svg-icons/av/pause'
import PlayingIcon from 'material-ui/svg-icons/av/play-arrow'

export default class Kick extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    label: PropTypes.string,
    onReady: PropTypes.func,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
    pitch: PropTypes.number,
  }

  static defaultProps = {
    label: 'Hihat',
    onReady: (triggerFunc) => { console.log(triggerFunc) },
    attack: 0.005,
    decay: 0.04,
    sustain: 0.9,
    release: 0.2,
    pitch: -6,
  }

  state = { playing: false }

  componentDidMount() {
    this.props.onReady(this.trigger.bind(this))
    this.pt = null
  }

  trigger(velocity) {
    if (this.pt) {
      clearTimeout(this.pt)
    }
    const osc = this.props.audioCtx.createOscillator()
    const volume = velocity / 127 * 0.5

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

    const freq = 440 * (2 ** ((this.props.pitch - 21) / 12))
    console.log(freq)
    osc.connect(gain)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq * 0.5, now)
    osc.frequency.exponentialRampToValueAtTime(freq * 3, attack)
    osc.frequency.exponentialRampToValueAtTime(freq, decay)
    osc.frequency.exponentialRampToValueAtTime(freq * 0.5, release)
    osc.start()
    osc.stop(now + attack + release)

    this.setState({ playing: true })

    this.pt = setTimeout(() => this.setState({ playing: false }), (release - now) * 1000)

    return gain
  }

  render() {
    return (<div className="reakt-drum__container">
      <h3>{this.props.label}</h3>
      <div>
        {this.state.playing ?
          (<PlayingIcon style={{ color: 'rgb(0, 188, 212)' }} />) :
          (<PausedIcon style={{ color: '#ccc' }} />)}
      </div>
    </div>)
  }
}
