import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnalyzerComponent from 'components/synth/analyzer'
import Filter from 'components/synth/filter'
import LFO from 'components/synth/lfo'
import MIDIEvent from 'components/synth/midi_event'

class Synthesizer extends Component {
  static propTypes = {
    noteOn: PropTypes.shape(),
    controlChange: PropTypes.shape(),
  }

  static defaultProps = {
    noteOn: {},
    controlChange: {},
  }

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
  }

  componentWillReceiveProps(nextProps) {
    /*
    // LFO freq
    if (this.props.controlChange[72] !== nextProps.controlChange[72]) {
      // this.lfo.frequency.value = (nextProps.controlChange[72] / 4) + 0.001
      this.lfoComponent.frequency = nextProps.controlChange[72]
    }
    */
  }

  handleControlChange(controlNumber, value) {
    console.log('handleControlChange', controlNumber, value)
    this.setState({ controlChange: { ...this.state.controlChange, [controlNumber]: value } })
  }

  noteOn(note, velocity) {
    const gain = this.audioCtx.createGain()
    gain.gain.value = (velocity / 127) * 0.5
    this.lfo.connect(gain.gain)

    const osc = this.audioCtx.createOscillator()
    osc.connect(gain)
    gain.connect(this.filter)
    osc.type = 'square'
    osc.frequency.value = 440 * (2 ** ((note - 69) / 12))
    osc.start()
    this.oscs[note] = osc
  }

  noteOff(note) {
    this.oscs[note].stop()
  }

  render() {
    return (<div>
      <div>
        {Object.keys(this.props.noteOn).map(note => (
          this.props.noteOn[note] ? 'o' : '-'
        )).join('')}
      </div>
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
        ref={(lfo) => { this.lfoComponent = lfo }}
        frequency={this.state.controlChange[72]}
        onReady={(lfoNode) => {
          console.log('LFO onready', lfoNode)
          this.lfo = lfoNode
        }}
      />
      <MIDIEvent
        onNoteOn={(note, velocity) => { this.noteOn(note, velocity) }}
        onNoteOff={(note) => { this.noteOff(note) }}
        onControlChange={(controlNumber, value) => { this.handleControlChange(controlNumber, value) }}
      />
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
