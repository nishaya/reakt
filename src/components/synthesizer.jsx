import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import AnalyzerComponent from 'components/synth/analyzer'
import Filter from 'components/synth/filter'
import MIDIInput from 'components/input/midi'
import KeyboardInput from 'components/input/keyboard'
import PadInput from 'components/input/pad'
import MIDIEvent from 'components/synth/midi_event'
import Oscillator from 'components/synth/oscillator'
import EG from 'components/synth/eg'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PanicButtonIcon from 'material-ui/svg-icons/av/pause'

class Synthesizer extends Component {
  static EG_CC = {
    73: 'attack',
    75: 'decay',
    85: 'sustain',
    72: 'release',
  }

  constructor(props) {
    super(props)
    const AudioContext = window.AudioContext || window.webkitAudioContext
    console.log(AudioContext)
    this.audioCtx = new AudioContext()
    console.log(this.audioCtx)
    this.oscs = []
    this.filter = null
    this.analyzer = null
    this.playFunc = (freq) => { console.log(freq) }
    this.egFunc = (gainNode) => { console.log(gainNode) }
    this.releaseFunc = (gainNode) => { console.log(gainNode) }
    this.egCCFunc = (paramName, value) => { console.log(paramName, value) }

    this.gainMap = new WeakMap()
    this.duplicatedOscs = new WeakSet()

    this.state = {
      controlChange: {
        71: 0, // Q
        74: 0, // Filter Freq
        76: 0, // LFO Freq
        77: 0, // LFO Depth
        73: 0, // Attack Time
        75: 0, // Decay Time
        85: 0, // Sustain Level
        72: 0, // Release Time
      },
      label: 'aaa',
    }
  }

  handleControlChange(controlNumber, value) {
    this.setState({ controlChange: { ...this.state.controlChange, [controlNumber]: value } })
    if (Object.keys(Synthesizer.EG_CC).includes(`${controlNumber}`)) {
      this.egCCFunc(Synthesizer.EG_CC[`${controlNumber}`], value)
    }
  }

  noteOn(note, velocity) {
    if (this.oscs[note]) {
      const exGain = this.gainMap.get(this.oscs[note])
      const stopTime = this.audioCtx.currentTime + 0.001
      exGain.gain.cancelScheduledValues(0)
      exGain.gain.linearRampToValueAtTime(
        0,
        stopTime,
      )
      this.oscs[note].stop(stopTime)
    }

    const volume = (velocity / 127) * 0.5
    const gain = this.egFunc(this.audioCtx.createGain(), volume)

    const frequency = 440 * (2 ** ((note - 69) / 12))
    const osc = this.playFunc(frequency)
    this.gainMap.set(osc, gain)
    osc.connect(gain)
    gain.connect(this.filter)
    this.filter.connect(this.analyzer)
    osc.start()
    this.oscs[note] = osc
  }

  noteOff(note) {
    const osc = this.oscs[note]
    if (!osc) {
      return
    }
    const gain = this.gainMap.get(osc)
    osc.stop(this.releaseFunc(gain))
  }

  panic() {
    this.oscs.forEach((osc) => {
      if (typeof osc.stop === 'function') {
        osc.stop()
      }
    })
  }

  render() {
    return (<div>
      <div>
        <KeyboardInput />
        <PadInput />
      </div>
      <div>
        <AnalyzerComponent
          audioCtx={this.audioCtx}
          onReady={(analyzerNode) => {
            this.analyzer = analyzerNode
          }}
        />
        <FloatingActionButton
          onClick={() => this.panic()}
          style={{ marginTop: 95 }}
          secondary
        >
          <PanicButtonIcon />
        </FloatingActionButton>
      </div>
      <div>
        <Oscillator
          audioCtx={this.audioCtx}
          type="sawtooth"
          onReady={(playFunc) => { this.playFunc = playFunc }}
        />
        <EG
          audioCtx={this.audioCtx}
          onReady={(egFunc, releaseFunc, egCCFunc) => {
            this.egFunc = egFunc
            this.releaseFunc = releaseFunc
            this.egCCFunc = egCCFunc
          }}
        />
        <Filter
          audioCtx={this.audioCtx}
          ref={(filter) => { this.filterComponent = filter }}
          frequency={this.state.controlChange[74]}
          q={this.state.controlChange[71]}
          onReady={(filterNode) => {
            this.filter = filterNode
          }}
        />
      </div>
      <div>
        <MIDIInput />
        <MIDIEvent
          onNoteOn={(note, velocity) => { this.noteOn(note, velocity) }}
          onNoteOff={(note) => { this.noteOff(note) }}
          onControlChange={
            (controlNumber, value) => { this.handleControlChange(controlNumber, value) }
          }
        />
      </div>
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
