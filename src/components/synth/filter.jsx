import React, { Component, PropTypes } from 'react'

const DEFAULT_FREQUENCY = 15000

export default class Filter extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    frequency: PropTypes.number,
    q: PropTypes.number,
  }

  static defaultProps = {
    onReady: (filter) => { console.log(filter) },
    frequency: DEFAULT_FREQUENCY,
    q: 0,
  }

  static value2freq(value) {
    return ((value / 127) * 15000)
  }

  static value2q(value) {
    return ((value / 127) * 70) + 0.0001
  }

  constructor(props) {
    super(props)
    this.state = {
      actualFrequency: DEFAULT_FREQUENCY,
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
    this.filter.frequency.value = DEFAULT_FREQUENCY
    // this.filter.connect(this.props.audioCtx.destination)
    this.props.onReady(this.filter)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.frequency !== nextProps.frequency) {
      this.frequency = nextProps.frequency
    }
    if (this.props.q !== nextProps.q) {
      this.q = nextProps.q
    }
  }

  set frequency(frequency) {
    const actualFrequency = Filter.value2freq(frequency)
    this.filter.frequency.value = actualFrequency
    this.setState({ frequency, actualFrequency })
  }


  set q(q) {
    const actualQ = Filter.value2q(q)
    this.filter.Q.value = actualQ
    this.setState({ q, actualQ })
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Filter</h2>
      <div className="reakt-component__body">
        <div>freq: {parseInt(this.state.actualFrequency * 100, 10) / 100} Hz</div>
        <div>Q: {parseInt(this.state.actualQ * 100, 10) / 100}</div>
      </div>
    </div>)
  }
}
