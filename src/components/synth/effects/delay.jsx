import React, { Component, PropTypes } from 'react'
import Slider from 'material-ui/Slider'
import DelayEffect from 'models/effects/delay'

export default class Delay extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    amount: PropTypes.number,
    time: PropTypes.number,
    feedback: PropTypes.number,
  }

  static defaultProps = {
    onReady: (delay) => {
      console.log(delay)
    },
    amout: 0.5,
    time: 0.3461,
    feedback: 0.5,
  }

  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.delay = new DelayEffect(
      this.props.audioCtx,
      this.time,
      this.amount,
      this.feedback,
    )
    this.props.onReady(this.delay)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Delay</h2>
      <div className="reakt-component__body">
        delay
      </div>
    </div>)
  }
}
