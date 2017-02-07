import React, { Component, PropTypes } from 'react'

export default class Filter extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      frequency: 0, // 0-127
      q: 0, // 0-127
    }
  }

  // setup & connect filter
  componentWillMount() {
    this.filterNode = this.props.audioCtx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.Q.value = 10
    this.filter.connect(this.props.audioCtx.destination)
  }

  set frequency(frequency) {
    this.setState({ frequency })
  }

  set q(q) {
    this.setState({ q })
  }

  filterNode: null

  render() {
    return (<div>Filter</div>)
  }
}
