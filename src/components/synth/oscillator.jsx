import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'material-ui/Slider'

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
    this.audioCtx = new window.AudioContext
    console.log(this.audioCtx)
    this.oscs = []

  }

  noteOn(note, velocity) {
    const gain = this.audioCtx.createGain()
    const osc = this.audioCtx.createOscillator()
    osc.connect(gain)
    gain.connect(this.audioCtx.destination)
    gain.gain.value = velocity / 127
    osc.type = 'sawtooth'
    osc.frequency.value = 440 * Math.pow(2, ((note - 69) / 12))
    osc.start()
    this.oscs[note] = osc
  }

  noteOff(note) {
    this.oscs[note].stop()
  }

  componentWillReceiveProps(nextProps) {
    for (let i = 0; i <= 127; i += 1) {
      if (this.props.noteOn[i] === 0 && nextProps.noteOn[i] > 0) {
        this.noteOn(i, nextProps.noteOn[i])
      } else if (this.props.noteOn[i] > 0 && nextProps.noteOn[i] === 0) {
        this.noteOff(i)
      }
    }
  }

  render() {
    return (<div>
      <div>
        {Object.keys(this.props.noteOn).map(note => (
          this.props.noteOn[note] ? 'o' : '-'
        )).join('')}
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
)(OscillatorComponent)
