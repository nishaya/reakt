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
    this.audioCtx = new window.AudioContext()
    this.oscs = []
    this.filter = null

    this.lfo = this.audioCtx.createOscillator()
    this.lfo.frequency.value = 8.0
    this.lfo.type = 'sine'
    this.lfo.start()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.controlChange[71] !== nextProps.controlChange[71]) {
      this.filterComponent.q = nextProps.controlChange[71]
    }
    if (this.props.controlChange[74] !== nextProps.controlChange[74]) {
      this.filterComponent.frequency = nextProps.controlChange[74]
    }
    // LFO freq
    if (this.props.controlChange[72] !== nextProps.controlChange[72]) {
      this.lfo.frequency.value = (nextProps.controlChange[72] / 4) + 0.001
      this.lfoComponent.frequency = nextProps.controlChange[72]
    }
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
        onReady={(filterNode) => {
          console.log('filter onready', filterNode)
          this.filter = filterNode
        }}
      />
      <LFO
        audioCtx={this.audioCtx}
        ref={(lfo) => { this.lfoComponent = lfo }}
      />
      <MIDIEvent
        onNoteOn={(note, velocity) => { this.noteOn(note, velocity) }}
        onNoteOff={(note) => { this.noteOff(note) }}
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
