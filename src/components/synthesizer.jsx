import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnalyzerComponent from 'components/synth/analyzer'
import Filter from 'components/synth/filter'
import LFO from 'components/synth/lfo'
import MIDIEvent from 'components/synth/midi_event'
import Oscillator from 'components/synth/oscillator'

class Synthesizer extends Component {
  constructor(props) {
    super(props)
    this.onControlChange = this.handleControlChange.bind(this)
    this.audioCtx = new window.AudioContext()
    this.oscs = []
    this.filter = null
    this.lfo = null
    this.filterComponent = null
    this.lfoComponent = null

    this.state = {
      controlChange: {
        71: 0,
        72: 0,
        74: 0,
      },
    }

    this.oscComponent = new Oscillator({ audioCtx: this.audioCtx })
  }

  handleControlChange(controlNumber, value) {
    this.setState({ controlChange: { ...this.state.controlChange, [controlNumber]: value } })
  }

  noteOn(note, velocity) {
    console.log(this.oscComponent)
    const gain = this.audioCtx.createGain()
    gain.gain.value = (velocity / 127) * 0.5
    this.lfo.connect(gain.gain)

    const frequency = 440 * (2 ** ((note - 69) / 12))
    const osc = this.oscComponent.play(frequency)
    osc.connect(gain)
    gain.connect(this.filter)
    osc.start()
    this.oscs[note] = osc
  }

  noteOff(note) {
    this.oscs[note].stop()
  }

  render() {
    return (<div>
      <AnalyzerComponent audioCtx={this.audioCtx} />
      <Filter
        audioCtx={this.audioCtx}
        ref={(filter) => { this.filterComponent = filter }}
        frequency={this.state.controlChange[74]}
        q={this.state.controlChange[71]}
        onReady={(filterNode) => {
          console.log('filter onready', filterNode)
          this.filter = filterNode
        }}
      />
      <LFO
        audioCtx={this.audioCtx}
        frequency={this.state.controlChange[72]}
        onReady={(lfoNode) => {
          console.log('LFO onready', lfoNode)
          this.lfo = lfoNode
        }}
      />
      <MIDIEvent
        onNoteOn={(note, velocity) => { this.noteOn(note, velocity) }}
        onNoteOff={(note) => { this.noteOff(note) }}
        onControlChange={
          (controlNumber, value) => { this.handleControlChange(controlNumber, value) }
        }
      />
      {this.oscComponent.render()}
    </div>)
  }
}

const mapStateToProps = state => ({
  noteOn: state.midi.noteOn,
  controlChange: state.midi.controlChange,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(Synthesizer)
