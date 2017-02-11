import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputActions from 'actions/input'
import Slider from 'material-ui/Slider'

class KeyboardInput extends Component {
  static MAX_OCTAVE = 10
  static DEFAULT_OCTAVE = 5

  static propTypes = {
    keyDown: PropTypes.func,
    keyUp: PropTypes.func,
    pressedKeys: PropTypes.shape(),
  }

  static defaultProps = {
    keyDown: () => {},
  }

  constructor(props) {
    super(props)
    document.addEventListener('keydown', event => this.onKeyDown(event))
    document.addEventListener('keyup', event => this.onKeyUp(event))
    this.state = {
      key: null,
      octave: KeyboardInput.DEFAULT_OCTAVE,
    }
    this.focus = this.focus.bind(this)
    this.keyCount = 0
    this.totalTime = 0
  }

  componentWillReceiveProps(newProps) {
    if (newProps.pressedKeys[this.pressedKey]) {
      const elapsedTime = performance.now() - this.time
      this.totalTime += elapsedTime
      console.log(`${elapsedTime}ms ${this.totalTime / this.keyCount}/${this.keyCount} `)
    }
  }

  onKeyDown(event) {
    this.pressedKey = event.key
    this.time = performance.now()
    this.keyCount += 1

    this.setState({ key: event.key })
    this.props.keyDown(event.key)
    this.textInput.value = event.key
  }

  onKeyUp(event) {
    this.props.keyUp(event.key)
  }

  focus() {
    this.textInput.focus()
  }

  get key() {
    return this.state.key
  }

  textInput = null

  render() {
    return (<div className="reakt-component__container">
      <h2>Keyboard Events</h2>
      <div className="reakt-component__body">

        <div>
          Octave(z/x):
          <Slider
            min={0}
            max={KeyboardInput.MAX_OCTAVE}
            value={this.state.octave}
            defaultValue={KeyboardInput.DEFAULT_OCTAVE}
          />
        </div>
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  pressedKeys: state.input.keyDown,
})

const mapDispatchToProps = dispatch => bindActionCreators(InputActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(KeyboardInput)
