import React, { Component, PropTypes } from 'react'

export default class Oscillator extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    type: PropTypes.string,
  }

  static defaultProps = {
    onPlay: (frequency, node) => { console.log('onPlay', frequency, node) }
    type: 'square',
  }

  static value2freq(value) {
    return (value / 4) + 0.001
  }

  constructor(props) {
    super(props)
    this.state = {
      type: 'square',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.type = nextProps.type
    }
  }

  set type(type) {
    this.lfo.type = type
    this.setState({ type })
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Oscillator</h2>
      <div className="reakt-component__body">
        <div>type: {this.state.type}</div>
      <div>
    </div>)
  }
}
