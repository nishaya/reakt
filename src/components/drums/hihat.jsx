import { PropTypes } from 'react'
import NoiseGenerator from 'utils/noise_generator'
import Base from 'components/drums/base'

export default class Hihat extends Base {
  static propTypes = {
    ...Base.propTypes,
  }

  static defaultProps = {
    ...Base.defaultProps,
    label: 'Hihat',
    attack: 0,
    decay: 0.1,
    sustain: 0.5,
    release: 0.3,
  }

  componentDidMount() {
    super.componentDidMount()
    this.buffer = NoiseGenerator.generateWhiteNoise(this.props.audioCtx)
  }

  trigger(velocity) {
    if (this.pt) {
      clearTimeout(this.pt)
    }
    const bufferSource = this.props.audioCtx.createBufferSource()
    const volume = velocity / 127 * 0.5

    const now = this.props.audioCtx.currentTime
    const { gain, attack, release } = this.applyADSR(now, volume)

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
