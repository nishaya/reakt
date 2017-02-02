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

  noteOn(note) {
    const gain = this.audioCtx.createGain()
    const osc = this.audioCtx.createOscillator()
    osc.connect(gain)
    gain.connect(this.audioCtx.destination)
    console.log(gain.gain.minValue, gain.gain.value, gain.gain.maxValue)
    osc.type = 'square'
    osc.frequency.value = 440 * Math.pow(2, ((note - 69) / 12))
    osc.start()
    this.oscs[note] = osc
  }

  noteOff(note) {
    this.oscs[note].stop()
  }

  componentWillReceiveProps(nextProps) {
    for (let i = 0; i <= 127; i += 1) {
      if (!this.props.noteOn[i] && nextProps.noteOn[i]) {
        console.log(`noteOn: ${i}`)
        this.noteOn(i)
      } else if (this.props.noteOn[i] && !nextProps.noteOn[i]) {
        console.log(`noteOff: ${i}`)
        this.noteOff(i)
      }
    }
  }

  renderSliders() {
    const sliders = []
    for (let i = 20; i <= 27; i += 1) {
      sliders.push((<Slider
        key={`slider_${i}`}
        min={0}
        max={127}
        value={this.props.controlChange[i]}
      />))
    }
    return sliders
  }

  render() {
    return (<div>
      <div>
        {Object.keys(this.props.noteOn).map(note => (
          this.props.noteOn[note] ? 'o' : '-'
        )).join('')}
      </div>
      <div>
        {this.renderSliders()}
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
