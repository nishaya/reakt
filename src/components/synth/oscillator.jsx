import React, { Component, PropTypes } from 'react'
import {
  RadioButton,
  RadioButtonGroup,
} from 'material-ui/RadioButton'
import SuperOscillator from 'models/super_oscillator'

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
      console.log(this.state.type.replace(/^super/, ''))
      return this.generateSuperSaw(
        {
          type: this.state.type.replace(/^super/, ''),
          frequency,
        },
      )
    }
    const osc = this.props.audioCtx.createOscillator()
    osc.type = this.state.type
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
              value="supersawtooth"
              label="Super Saw"
            />
            <RadioButton
              value="supersquare"
              label="Super Square"
            />
          </RadioButtonGroup>
        </div>
      </div>
    </div>)
  }
}
