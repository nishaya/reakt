import React, { Component, PropTypes } from 'react'

export default class EG extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    attack: PropTypes.number,
    decay: PropTypes.number,
    sustain: PropTypes.number,
    release: PropTypes.number,
  }

  static ATTACK_OFFSET = 0.001

  static defaultProps = {
    onReady: (generateEnvelopFunc, setReleaseFunc) => {
      console.log(generateEnvelopFunc, setReleaseFunc)
    },
    attack: 0,
    decay: 0,
    sustain: 1.0,
    release: 0.3,
  }

  constructor(props) {
    super(props)
    this.state = {
      actualAttack: 0.6,
      actualDecay: 0.2,
      actualSustain: 0.8,
      actualRelease: 0.3,
    }
  }

  // setup & connect filter
  componentWillMount() {
    this.props.onReady(
      this.generateEnvelop.bind(this),
      this.setRelease.bind(this),
    )
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {}
    if (this.props.attack !== nextProps.attack) {
      nextState.actualAttack = nextProps.attack // TOOD: 0-127から変換
    }
    this.setState(nextState)
  }

  setRelease(gain) {
    const now = this.props.audioCtx.currentTime
    const releaseTime = now + this.state.actualRelease
    gain.gain.linearRampToValueAtTime(
      0,
      releaseTime,
    )
    return releaseTime + 0.01
  }

  generateEnvelop(gain) {
    const gainNode = gain || this.props.audioCtx.createGain()
    const now = this.props.audioCtx.currentTime
    const attackTime = now + this.state.actualAttack + EG.ATTACK_OFFSET
    const decayTime = attackTime + this.state.actualDecay
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(
      1,
      attackTime,
    )
    gainNode.gain.linearRampToValueAtTime(
      this.state.actualSustain,
      decayTime,
    )
    return gainNode
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>EG</h2>
      <div className="reakt-component__body">
        <div>Attack: {this.state.actualAttack}</div>
        <div>Decay: {this.state.actualDecay}</div>
        <div>Sustain: {this.state.actualSustain}</div>
        <div>Release: {this.state.actualRelease}</div>
      </div>
    </div>)
  }
}
