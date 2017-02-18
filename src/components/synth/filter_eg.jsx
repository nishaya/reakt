import EG from 'components/synth/eg'

export default class FilterEG extends EG {
  static defaultProps = {
    label: 'FilterEG',
  }

  constructor(props) {
    super(props)
    this.state = {
      attack: 0,
      decay: 0.1,
      sustain: 0.2,
      release: 0.3,
    }
  }

  setRelease(filter) {
    const now = this.props.audioCtx.currentTime
    const releaseTime = now + this.state.release + 0.001
    filter.frequency.cancelScheduledValues(0)
    filter.frequency.linearRampToValueAtTime(
      0,
      releaseTime,
    )
    return releaseTime
  }

  generateEnvelop(filter, frequency = 15000) {
    const filterNode = filter || this.props.audioCtx.createBiquadFilter()
    filterNode.type = 'lowpass'
    const now = this.props.audioCtx.currentTime
    const attackTime = now + this.state.attack + EG.ATTACK_OFFSET
    const decayTime = attackTime + this.state.decay
    filterNode.frequency.setValueAtTime(0, now)
    filterNode.frequency.linearRampToValueAtTime(
      1.0 * frequency,
      attackTime,
    )
    filterNode.frequency.linearRampToValueAtTime(
      this.state.sustain * frequency,
      decayTime,
    )
    return filterNode
  }
}
