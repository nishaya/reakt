import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputActions from 'actions/input'

class KeyboardInput extends Component {
  static propTypes = {
    keyDown: PropTypes.func,
    pressedKeys: PropTypes.shape(),
  }

  static defaultProps = {
    keyDown: () => {},
  }

  constructor(props) {
    super(props)
    document.addEventListener('keydown', event => this.onKeyDown(event))
    this.state = {
      key: null,
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

  focus() {
    this.textInput.focus()
  }

  get key() {
    return this.state.key
  }

  textInput = null

  render() {
    return (<div>
      <input type="text" ref={(input) => { this.textInput = input }} />
      <input type="text" value={`${this.state.key}`} readOnly />
    </div>)
  }
}

const mapStateToProps = state => ({
  pressedKeys: state.input.keyDown,
})

const mapDispatchToProps = dispatch => bindActionCreators(InputActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(KeyboardInput)
