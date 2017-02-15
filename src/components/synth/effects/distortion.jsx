import React, { Component, PropTypes } from 'react'
import Slider from 'material-ui/Slider'
import DistortionEffect from 'models/effects/distortion'

export default class Distortion extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (distortion) => {
      console.log(distortion)
    },
  }

  static PARAMS = {
    amount: {
      label: 'Amount',
      min: 0,
      max: 1.0,
    },
  }

  constructor(props) {
    super(props)
    this.state = {
      amount: 0.5,
    }
  }

  componentWillMount() {
    this.distortion = new DistortionEffect(
      this.props.audioCtx,
      this.state.amount,
    )
    this.props.onReady(this.distortion)
  }

  renderSlider(key) {
    return (<div>
      {Distortion.PARAMS[key].label} : {parseInt(this.state[key] * 100, 10) / 100}
      <Slider
        key={`slider_${key}`}
        min={Distortion.PARAMS[key].min}
        max={Distortion.PARAMS[key].max}
        step={0.01}
        value={this.state[key]}
        onChange={(e, value) => {
          this.distortion[key] = value
          this.setState({ [key]: value })
        }}
      />
    </div>)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Distortion</h2>
      <div className="reakt-component__body">
        {this.renderSlider('amount')}
      </div>
    </div>)
  }
}
