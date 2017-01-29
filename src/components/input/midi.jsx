import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputActions from 'actions/input'

class MidiInput extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    navigator.requestMIDIAccess().then(this.midiEnabled, this.midiUnavailable)
  }

  midiEnabled(midi) {
    console.log('midiEnabled', midi)
  }

  midiUnavailable(e) {
    console.log('midiUnavailabel', e)
  }

  render() {
    return (<div>midi input</div>)
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(InputActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MidiInput)
