import React, { Component, PropTypes } from 'react'
import Slider from 'material-ui/Slider'
import DelayEffect from 'models/effects/delay'

export default class Delay extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (delay) => {
      console.log(delay)
    },
  }

  static PARAMS = {
    amount: {
      label: 'Amount',
      min: 0,
      max: 1.0,
    },
    time: {
      label: 'DelayTime',
      min: 0,
      max: 5.0,
    },
    feedback: {
      label: 'FeedbackLevel',
      min: 0,
      max: 1.0,
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      amount: 0.5,
      time: 0.3461,
      feedback: 0.5,
    }
  }

  componentWillMount() {
    this.delay = new DelayEffect(
      this.props.audioCtx,
      this.state.time,
      this.state.amount,
      this.state.feedback,
    )
    this.props.onReady(this.delay)
  }

  renderSlider(key) {
    return (<div>
      {Delay.PARAMS[key].label} : {parseInt(this.state[key] * 100, 10) / 100}
      <Slider
        key={`slider_${key}`}
        min={Delay.PARAMS[key].min}
        max={Delay.PARAMS[key].max}
        step={0.01}
        value={this.state[key]}
        onChange={(e, value) => {
          this.delay[key] = value
          this.setState({ [key]: value })
        }}
      />
    </div>)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Delay</h2>
      <div className="reakt-component__body">
        {this.renderSlider('time')}
        {this.renderSlider('amount')}
        {this.renderSlider('feedback')}
      </div>
    </div>)
  }
}
