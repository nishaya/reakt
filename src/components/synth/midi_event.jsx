import React, { Component, PropTypes } from 'react'

export default class MIDIEvent extends Component {
  static propTypes = {
    onNoteOn: PropTypes.func,
    onNoteOff: PropTypes.func,
  }

  static defaultProps = {
    onNoteOn: (note, velocity) => { console.log('note on', note, velocity) },
    onNoteOff: (note) => { console.log('note off', note) },
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (<div>
      <h2>MIDI Events</h2>
    </div>)
  }
}
