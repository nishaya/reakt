import React, { Component, PropTypes } from 'react'

export default class DrumKit extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    trigger: PropTypes.func.isRequired,
  }

  static defaultProps = {
    trigger: (note, velocity) => { console.log('trigger', note, velocity) },
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Drum Kit</h2>
      <div>
        drums
      </div>
    </div>)
  }
}
