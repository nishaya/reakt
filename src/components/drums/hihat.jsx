import React, { Component, PropTypes } from 'react'

export default class DrumKit extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: (triggerFunc) => { console.log(triggerFunc) },
  }

  componentDidMount() {
    this.props.onReady(this.trigger.bind(this))
  }

  trigger(velocity) {
    console.log('trigger hihat', velocity)
  }

  render() {
    return (<div className="reakt-drum__container">
      <h3>Hihat</h3>
      <div>
        hihat
      </div>
    </div>)
  }
}
