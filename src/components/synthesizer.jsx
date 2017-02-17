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
import FilterEG from 'components/synth/filter_eg'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import PanicButtonIcon from 'material-ui/svg-icons/av/pause'
import DrumKit from 'components/drum_kit'
import Delay from 'components/synth/effects/delay'
import Distortion from 'components/synth/effects/distortion'

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
    this.analyzerConnected = false
    this.delayEffect = null
    this.delayConnected = false
    this.playFunc = (freq) => { console.log(freq) }
    this.egFunc = (gainNode) => { console.log(gainNode) }
    this.releaseFunc = (gainNode) => { console.log(gainNode) }
    this.egCCFunc = (paramName, value) => { console.log(paramName, value) }
    this.dkTriggerFunc = (note, velocity) => { console.log(note, velocity) }

    this.gainMap = new WeakMap()
    this.filterMap = new WeakMap()
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
    if (note < 12) {
      const dkNode = this.dkTriggerFunc(note, velocity)
      if (!dkNode) {
        return
      }
      dkNode.connect(this.filter)
      return
    }
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

    const frequency = 440 * (2 ** ((note - 69) / 12))
    const osc = this.playFunc(frequency)

    let volume = velocity / 127
    if (osc instanceof OscillatorNode && osc.type !== 'custom') {
      volume *= 0.3
    }
    const gain = this.egFunc(this.audioCtx.createGain(), volume)
    const filter = this.fEgFunc()
    this.gainMap.set(osc, gain)
    this.filterMap.set(osc, filter)
    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.distortionEffect.destination)
    this.distortionEffect.connect(this.filter)
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
    const filter = this.filterMap.get(osc)
    this.fReleaseFunc(filter)
  }

  panic() {
    this.oscs.forEach((osc) => {
      if (typeof osc.stop === 'function') {
        osc.stop()
      }
    })
  }

  connectNodes() {
    if (!this.analyzerConnected && this.delayEffect && this.analyzer) {
      this.delayEffect.connect(this.analyzer)
      this.analyzerConnected = true
    }

    if (!this.delayConnected && this.filter && this.delayEffect) {
      this.filter.connect(this.delayEffect.destination)
      this.delayEffect.connect(this.audioCtx.destination)
      this.delayConnected = true
    }
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
            this.connectNodes()
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
          label="AmpEG"
          onReady={(egFunc, releaseFunc, egCCFunc) => {
            this.egFunc = egFunc
            this.releaseFunc = releaseFunc
            this.egCCFunc = egCCFunc
          }}
        />
        <FilterEG
          audioCtx={this.audioCtx}
          label="FilterEG"
          onReady={(egFunc, releaseFunc, egCCFunc) => {
            this.fEgFunc = egFunc
            this.fReleaseFunc = releaseFunc
            this.fEgCCFunc = egCCFunc
          }}
        />
        <Delay
          audioCtx={this.audioCtx}
          onReady={(delay) => {
            this.delayEffect = delay
            this.connectNodes()
          }}
        />
        <Distortion
          audioCtx={this.audioCtx}
          onReady={(distortion) => {
            this.distortionEffect = distortion
          }}
        />
        <Filter
          audioCtx={this.audioCtx}
          ref={(filter) => { this.filterComponent = filter }}
          frequency={this.state.controlChange[74]}
          q={this.state.controlChange[71]}
          onReady={(filterNode) => {
            this.filter = filterNode
            this.connectNodes()
          }}
        />
      </div>
      <div>
        <DrumKit
          audioCtx={this.audioCtx}
          onReady={(triggerFunc) => {
            this.dkTriggerFunc = triggerFunc
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
