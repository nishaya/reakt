import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MIDIEvent extends Component {
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

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const mapStateToProps = state => ({
  noteOn: state.midi.noteOn,
  controlChange: state.midi.controlChange,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(MIDIEvent)
