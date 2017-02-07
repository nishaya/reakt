import React, { Component, PropTypes } from 'react'

export default class LFO extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (lfo) => { console.log(lfo) },
  }

  render() {
    return (<div>LFO</div>)
  }
}
