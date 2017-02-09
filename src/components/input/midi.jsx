import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import MidiActions from 'actions/midi'

class MidiInput extends Component {
  static propTypes = {
    onMidiMessage: PropTypes.func,
    selectMidiDevice: PropTypes.func,
  }

  static defaultProps = {
    onMidiMessage: () => {},
  }

  constructor(props) {
    super(props)
    navigator.requestMIDIAccess({ sysex: true })
      .then(this.midiEnabled.bind(this), this.midiUnavailable)
    this.state = {
      inputs: [],
      selectedInput: null,
    }
  }

  midiEnabled(midi) {
    const inputs = []
    for (const input of midi.inputs.values()) {
      inputs.push(input)
    }
    this.setState({ inputs })
  }

  midiUnavailable(e) {
    console.log('midiUnavailabel', e)
  }

  selectInput(index) {
    const input = this.state.inputs[index]
    input.onmidimessage = (e) => {
      this.props.onMidiMessage(e.data)
    }
    input.open().then(port => console.log('opened', port))
    this.setState({ selectedInput: input })
    this.props.selectMidiDevice(input.id)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>MIDI Inputs</h2>
      <div className="reakt-component__body">
        <DropDownMenu value={0} onChange={(event, key) => this.selectInput(key)} >
          {this.state.inputs.map((input, index) => (
            <MenuItem key={`input_${input.id}`} value={index} primaryText={input.name} />
          ))}
        </DropDownMenu>
        {this.state.selectedInput ? (<div>
          {this.state.selectedInput.name}
        </div>) : null}
      </div>
    </div>)
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators(MidiActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MidiInput)
