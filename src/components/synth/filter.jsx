import React, { Component, PropTypes } from 'react'

export default class Filter extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
  }

  static value2freq(value) {
    return ((value / 127) * 15000) + 1
  }

  static value2q(value) {
    return ((value / 127) * 70) + 0.0001
  }

  constructor(props) {
    super(props)
    this.state = {
      frequency: 0, // 0-127
      actualFrequency: 0,
      q: 0, // 0-127
      actualQ: 0,
    }

    this.filter = null
  }

  // setup & connect filter
  componentWillMount() {
    this.filter = this.props.audioCtx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.Q.value = 10
    // this.filter.connect(this.props.audioCtx.destination)
  }

  set frequency(frequency) {
    const actualFrequency = Filter.value2freq(frequency)
    this.filter.frequency.vcalue = actualFrequency
    this.setState({ frequency, actualFrequency })
  }


  set q(q) {
    const actualQ = Filter.value2q(q)
    this.filter.Q.value = actualQ
    this.setState({ q, actualQ })
  }

  render() {
    return (<div>
      <h3>Filter</h3>
      <div>frequency: {this.state.actualFrequency}</div>
      <div>Q: {this.state.actualQ}</div>
    </div>)
  }
}
