import { PropTypes } from 'react'
import NoiseGenerator from 'utils/noise_generator'
import Base from 'components/drums/base'

export default class Hihat extends Base {
  static propTypes = {
    ...Base.propTypes,
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
  }

  static defaultProps = {
    ...Base.defaultProps,
    label: 'Hihat',
    onReady: (triggerFunc) => { console.log(triggerFunc) },
    attack: 0,
    decay: 0.1,
    sustain: 0.5,
    release: 0.3,
  }

  componentDidMount() {
    this.props.onReady(this.trigger.bind(this))
    this.buffer = NoiseGenerator.generateWhiteNoise(this.props.audioCtx)
    this.pt = null
  }

  trigger(velocity) {
    if (this.pt) {
      clearTimeout(this.pt)
    }
    const bufferSource = this.props.audioCtx.createBufferSource()
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

    bufferSource.buffer = this.buffer
    bufferSource.connect(gain)
    bufferSource.loop = true
    bufferSource.start()
    bufferSource.stop(now + attack + release)

    this.setState({ playing: true })

    this.pt = setTimeout(() => this.setState({ playing: false }), (release - now) * 1000)

    return gain
  }
}
