import React, { Component, PropTypes } from 'react'
import {
  RadioButton,
  RadioButtonGroup,
} from 'material-ui/RadioButton'

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
    this.type = 'sawtooth'
  }

  componentWillMount() {
    this.props.onReady(this.play.bind(this))
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.type = nextProps.type
    }
  }

  play(frequency) {
    const osc = this.props.audioCtx.createOscillator()
    osc.type = this.type
    osc.frequency.value = frequency
    return osc
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Oscillator</h2>
      <div className="reakt-component__body">
        <div>type: {this.type}</div>
        <div>
          <RadioButtonGroup
            className="reakt-oscillator__typeselector"
            name="type"
            defaultSelected={this.type}
            onChange={(event, value) => {
              this.type = value
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
          </RadioButtonGroup>
        </div>
      </div>
    </div>)
  }
}
