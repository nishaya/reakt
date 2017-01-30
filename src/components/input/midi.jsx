import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import InputActions from 'actions/input'

class MidiInput extends Component {
  static propTypes = {
  }

  constructor(props) {
    super(props)
    navigator.requestMIDIAccess({ sysex: true }).then(this.midiEnabled.bind(this), this.midiUnavailable)
    this.state = {
      inputs: [],
      selectedInput: null,
    }
  }

  midiEnabled(midi) {
    console.log('midiEnabled', midi.inputs)
    const inputs = []
    for(const input of midi.inputs.values()) {
      console.log(input)
      inputs.push(input)
    }
    this.setState({ inputs })
  }

  midiUnavailable(e) {
    console.log('midiUnavailabel', e)
  }

  selectInput(index) {
    console.log('selectInput', index)
    this.setState({ selectedInput: this.state.inputs[index] })
  }

  render() {
    console.log(this.state)
    return (<div>midi inputs
      <DropDownMenu value={0} onChange={(event, key) => this.selectInput(key)} >
        {this.state.inputs.map((input, index) => (
          <MenuItem key={`input_${input.id}`} value={index} primaryText={input.name} />
        ))}
      </DropDownMenu>
      {this.state.selectedInput ? (<div>
        {this.state.selectedInput.name}
      </div>) : null}
    </div>)
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(InputActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(MidiInput)
