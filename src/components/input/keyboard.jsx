import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputActions from 'actions/input'
import MIDIActions from 'actions/midi'
import Slider from 'material-ui/Slider'

class KeyboardInput extends Component {
  static MIN_OCTAVE = 1
  static MAX_OCTAVE = 9
  static DEFAULT_OCTAVE = 4
  static KEY_MAP = {
    a: { number: 0, label: 'C', black: false },
    w: { number: 1, label: 'C#', black: true },
    s: { number: 2, label: 'D', black: false },
    e: { number: 3, label: 'D#', black: true },
    d: { number: 4, label: 'E', black: false },
    f: { number: 5, label: 'F', black: false },
    t: { number: 6, label: 'F#', black: true },
    g: { number: 7, label: 'G', black: false },
    y: { number: 8, label: 'G#', black: true },
    h: { number: 9, label: 'A', black: false },
    u: { number: 10, label: 'A#', black: true },
    j: { number: 11, label: 'B', black: false },
    k: { number: 12, label: 'C', black: false },
    o: { number: 13, label: 'C#', black: true },
    l: { number: 14, label: 'D', black: false },
  }

  static propTypes = {
    keyDown: PropTypes.func,
    keyUp: PropTypes.func,
    midiNoteOn: PropTypes.func.isRequired,
    midiNoteOff: PropTypes.func.isRequired,
  }

  static defaultProps = {
    keyDown: () => {},
    keyUp: () => {},
  }

  constructor(props) {
    super(props)
    this.state = {
      key: null,
      octave: KeyboardInput.DEFAULT_OCTAVE,
      keyPressed: {},
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', event => this.onKeyDown(event))
    document.addEventListener('keyup', event => this.onKeyUp(event))
  }

  componentWillReceiveProps(newProps) {
    if (newProps.pressedKeys[this.pressedKey]) {
      const elapsedTime = performance.now() - this.time
      this.totalTime += elapsedTime
      console.log(`${elapsedTime}ms ${this.totalTime / this.keyCount}/${this.keyCount} `)
    }
  }

  onKeyDown(event) {
    const key = event.key
    if (['x', 'z'].includes(key)) {
      const funcs = {
        x: () => this.changeOctave(1),
        z: () => this.changeOctave(-1),
      }
      funcs[key]()
    }

    if (Object.keys(KeyboardInput.KEY_MAP).includes(key)) {
      const noteNumber = (this.state.octave * 12) + KeyboardInput.KEY_MAP[key].number
      console.log('keydown', key, noteNumber)
      this.props.midiNoteOn(noteNumber, 127)
    }

    const keyPressed = { ...this.state.keyPressed, [key]: true }
    this.setState({ key, keyPressed })
    this.props.keyDown(key)
  }

  onKeyUp(event) {
    const key = event.key
    this.props.keyUp(key)
    const keyPressed = { ...this.state.keyPressed, [key]: false }
    this.setState({ keyPressed })

    if (Object.keys(KeyboardInput.KEY_MAP).includes(key)) {
      const noteNumber = (this.state.octave * 12) + KeyboardInput.KEY_MAP[key].number
      console.log('keyup', key, noteNumber)
      this.props.midiNoteOff(noteNumber)
    }
  }

  changeOctave(value) {
    let octave = this.state.octave
    octave += value
    if (octave < 0) {
      octave = 0
    }
    if (octave > KeyboardInput.MAX_OCTAVE) {
      octave = KeyboardInput.MAX_OCTAVE
    }
    this.setState({ octave })
  }

  get key() {
    return this.state.key
  }

  textInput = null

  renderKeys() {
    return Object.keys(KeyboardInput.KEY_MAP).map((key) => {
      const classNames = ['reakt-keyboard__key']
      if (KeyboardInput.KEY_MAP[key].black) {
        classNames.push('reakt-keyboard__key__black')
      }
      if (this.state.keyPressed[key]) {
        classNames.push('reakt-keyboard__key__pressed')
      }
      return (<span
        key={`key_${key}`}
        className={classNames.join(' ')}
      >
        <div>{key.toUpperCase()}</div>
        <div className="reakt-keyboard__key__label">{KeyboardInput.KEY_MAP[key].label}</div>
      </span>)
    })
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Keyboard Input</h2>
      <div className="reakt-component__body">

        <div>
          Octave(z:down/x:up): {this.state.octave}
          <Slider
            min={KeyboardInput.MIN_OCTAVE}
            max={KeyboardInput.MAX_OCTAVE}
            step={1}
            value={this.state.octave}
            defaultValue={KeyboardInput.DEFAULT_OCTAVE}
            onChange={(e, octave) => { this.setState({ octave }) }}
          />
        </div>
        <div>{this.renderKeys()}</div>
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  pressedKeys: state.input.keyDown,
})

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...InputActions, ...MIDIActions },
  dispatch,
)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(KeyboardInput)
