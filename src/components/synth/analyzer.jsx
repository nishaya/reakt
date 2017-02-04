import React, { Component, PropTypes } from 'react'

export default class AnalyzerComponent extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext),
  }

  static defaultProps = {
    audioCtx: new window.AudioContext(),
  }

  componentDidMount() {
    this.analyzer = this.props.audioCtx.createAnalyser()
    console.log(this.analyzer)
  }

  render() {
    return (<div>
      analyzer
    </div>)
  }
}
