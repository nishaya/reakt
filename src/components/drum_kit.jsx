import React, { Component, PropTypes } from 'react'
import Hihat from 'components/drums/hihat'

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

  triggerFuncs = []

  trigger(note, velocity) {
    console.log('trigger', note, velocity)
    this.triggerFuncs[0](velocity)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Drum Kit</h2>
      <div>
        <Hihat
          audioCtx={this.props.audioCtx}
          onReady={(triggerFunc) => {
            this.triggerFuncs[0] = triggerFunc
          }}
        />
      </div>
    </div>)
  }
}
