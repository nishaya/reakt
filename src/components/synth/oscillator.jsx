import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SliderControl from 'components/control/slider'

class OscillatorComponent extends Component {
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
    this.filter = this.audioCtx.createBiquadFilter()
    this.filter.type = 'lowpass'
    this.filter.Q.value = 10
    this.filter.connect(this.audioCtx.destination)
  }

  componentWillReceiveProps(nextProps) {
    for (let i = 0; i <= 127; i += 1) {
      if (this.props.noteOn[i] === 0 && nextProps.noteOn[i] > 0) {
        this.noteOn(i, nextProps.noteOn[i])
      } else if (this.props.noteOn[i] > 0 && nextProps.noteOn[i] === 0) {
        this.noteOff(i)
      }
    }

    if (this.props.controlChange[71] !== nextProps.controlChange[71]) {
      this.filter.Q.value = ((nextProps.controlChange[71] / 127) * 70) + 0.0001
    }
    if (this.props.controlChange[74] !== nextProps.controlChange[74]) {
      this.filter.frequency.value = ((nextProps.controlChange[74] / 127) * 15000) + 10
    }
  }

  noteOn(note, velocity) {
    const gain = this.audioCtx.createGain()
    const osc = this.audioCtx.createOscillator()
    osc.connect(gain)
    gain.connect(this.filter)
    gain.gain.value = velocity / 127
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
      <SliderControl label="Resonance #71" value={this.props.controlChange[71]} />
      <SliderControl label="Cutoff #74" value={this.props.controlChange[74]} />
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
)(OscillatorComponent)
