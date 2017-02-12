import React, { Component, PropTypes } from 'react'
import {
  RadioButton,
  RadioButtonGroup,
} from 'material-ui/RadioButton'
import SuperOscillator from 'models/super_oscillator'
import WaveTable from 'models/wave_table'

export default class Oscillator extends Component {
  static propTypes = {
    audioCtx: PropTypes.instanceOf(AudioContext).isRequired,
    type: PropTypes.string,
    onReady: PropTypes.func.isRequired,
  }

  static defaultProps = {
    type: 'sawtooth',
    onReady: (playFunc) => { console.log(playFunc) },
  }

  constructor(props) {
    super(props)
    this.state = {
      type: 'sawtooth',
    }
  }

  componentWillMount() {
    this.setState({ type: this.props.type })
    this.props.onReady(this.play.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({ type: nextProps.type })
    }
  }

  play(frequency) {
    if (this.state.type.match(/^super/)) {
      return this.generateSuperSaw(
        {
          type: this.state.type.replace(/^super/, ''),
          frequency,
        },
      )
    }
    const osc = this.props.audioCtx.createOscillator()
    if (this.state.type.match(/^wt/)) {
      const table = [1, -1, -1, -1]
      // const table = [1, -1, -1, -1]
      // const table = [100, 80, 60, 40, 20, 0, 20, 40, 60, 80]
      let len = parseInt(-(Math.log2(frequency / 880) * 80), 10)
      if (len < 10) {
        len = 10
      }
      console.log('WT', frequency, len)

      const waveTable = new WaveTable(
        table,
      )
      osc.setPeriodicWave(
        waveTable.createPeriodicWave(this.props.audioCtx, len),
      )
    } else {
      osc.type = this.state.type
    }
    osc.frequency.value = frequency
    return osc
  }

  generateSuperSaw(options) {
    const osc = new SuperOscillator(this.props.audioCtx, options)
    return osc
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Oscillator</h2>
      <div className="reakt-component__body">
        <div>
          <RadioButtonGroup
            className="reakt-oscillator__typeselector"
            name="type"
            defaultSelected={this.props.type}
            onChange={(event, value) => {
              this.setState({ type: value })
            }}
          >
            <RadioButton
              value="sawtooth"
              label="Saw"
            />
            <RadioButton
              value="square"
              label="Square"
            />
            <RadioButton
              value="sine"
              label="Sine"
            />
            <RadioButton
              value="triangle"
              label="Triangle"
            />
            <RadioButton
              value="supersawtooth"
              label="SuperSaw"
            />
            <RadioButton
              value="supersquare"
              label="SuperSquare"
            />
            <RadioButton
              value="supersine"
              label="SuperSine"
            />
            <RadioButton
              value="supertriangle"
              label="SuperTriangle"
            />
            <RadioButton
              value="wt"
              label="WaveTable"
            />

          </RadioButtonGroup>
        </div>
      </div>
    </div>)
  }
}
