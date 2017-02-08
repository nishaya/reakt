import React, { Component, PropTypes } from 'react'

export default class Oscillator extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    type: PropTypes.string,
  }

  static defaultProps = {
    type: 'square',
  }

  constructor(props) {
    super(props)
    this.state = {
      type: props.type,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.type = nextProps.type
    }
  }

  play(frequency) {
    const osc = this.props.audioCtx.createOscillator()
    osc.type = this.state.type
    osc.frequency.value = frequency
    return osc
  }

  set type(type) {
    this.setState({ type })
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Oscillator</h2>
      <div className="reakt-component__body">
        <div>type: {this.state.type}</div>
      </div>
    </div>)
  }
}
