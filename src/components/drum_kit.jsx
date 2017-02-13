import React, { Component, PropTypes } from 'react'
import Hihat from 'components/drums/hihat'
import Kick from 'components/drums/kick'

export default class DrumKit extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    onReady: PropTypes.func,
    destination: PropTypes.instanceOf(AudioNode),
  }

  static defaultProps = {
    onReady: (triggerFunc) => { console.log(triggerFunc) },
    destination: null,
  }

  componentDidMount() {
    this.props.onReady(this.trigger.bind(this))
  }

  triggerFuncs = []

  trigger(note, velocity) {
    if (this.triggerFuncs[note]) {
      return this.triggerFuncs[note](velocity)
    }

    return null
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Drum Kit</h2>
      <div>
        <Kick
          audioCtx={this.props.audioCtx}
          onReady={(triggerFunc) => {
            this.triggerFuncs[0] = triggerFunc
          }}
          label="Kick"
        />
        <Hihat
          audioCtx={this.props.audioCtx}
          onReady={(triggerFunc) => {
            this.triggerFuncs[1] = triggerFunc
          }}
          label="Snare"
          attack={0}
          decay={0.02}
          sustain={0.8}
          release={0.2}
        />
        <Hihat
          audioCtx={this.props.audioCtx}
          onReady={(triggerFunc) => {
            this.triggerFuncs[2] = triggerFunc
          }}
          label="CHH"
          attack={0}
          decay={0.05}
          sustain={0.3}
          release={0}
        />
        <Hihat
          audioCtx={this.props.audioCtx}
          onReady={(triggerFunc) => {
            this.triggerFuncs[3] = triggerFunc
          }}
          label="OHH"
          attack={0}
          decay={0.05}
          sustain={0.5}
          release={0.2}
        />
        <Hihat
          audioCtx={this.props.audioCtx}
          onReady={(triggerFunc) => {
            this.triggerFuncs[4] = triggerFunc
          }}
          label="Cymbal"
          attack={0}
          decay={0.05}
          sustain={0.3}
          release={1.0}
        />
      </div>
    </div>)
  }
}
