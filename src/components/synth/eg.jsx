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

  static defaultProps = {
    onReady: (generateEnvelopFunc) => { console.log(generateEnvelopFunc) },
    attack: 0,
    decay: 2,
    sustain: 2,
    release: 0.5,
  }

  constructor(props) {
    super(props)
    this.state = {
      actualAttack: 0,
      actualDecay: 2,
      actualSustain: 2,
      actualRelease: 0.5,
    }
  }

  // setup & connect filter
  componentWillMount() {
    this.props.onReady(this.generateEnvelop)
  }

  componentWillReceiveProps(nextProps) {
    const nextState = {}
    if (this.props.attack !== nextProps.attack) {
      nextState.actualAttack = nextProps.attack // TOOD: 0-127から変換
    }
    this.setState(nextState)
  }

  generateEnvelop(gain) {
    const gainNode = gain || this.props.audioCtx.createGain()
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
