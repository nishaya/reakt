import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class MIDIEvent extends Component {
  static propTypes = {
    noteOn: PropTypes.shape().isRequired,
    controlChange: PropTypes.shape().isRequired,
    onNoteOn: PropTypes.func,
    onNoteOff: PropTypes.func,
    onControlChange: PropTypes.func,
    logs: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  }

  static defaultProps = {
    onNoteOn: (note, velocity) => { console.log('note on', note, velocity) },
    onNoteOff: (note) => { console.log('note off', note) },
    onControlChange: (controlNumber, value) => { console.log('control change', controlNumber, value) },
  }

  componentWillReceiveProps(nextProps) {
    for (let i = 0; i <= 127; i += 1) {
      if (this.props.noteOn[i] === 0 && nextProps.noteOn[i] > 0) {
        this.props.onNoteOn(i, nextProps.noteOn[i])
      } else if (this.props.noteOn[i] > 0 && nextProps.noteOn[i] === 0) {
        this.props.onNoteOff(i)
      }
    }

    [71, 72, 73, 74, 75, 76, 77, 85].forEach((controlNumber) => {
      if (this.props.controlChange[controlNumber] !== nextProps.controlChange[controlNumber]) {
        this.props.onControlChange(controlNumber, nextProps.controlChange[controlNumber])
      }
    })
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>MIDI Events</h2>
      <div>
        {this.props.logs.map(log => (<div key={log.time}>
          {log.message}
        </div>))}
      </div>
    </div>)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
const mapStateToProps = state => ({
  noteOn: state.midi.noteOn,
  controlChange: state.midi.controlChange,
  logs: state.midi.logs,
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(MIDIEvent)
