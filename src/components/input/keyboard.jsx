import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import InputActions from 'actions/input'

class KeyboardInput extends Component {
  static propTypes = {
    keyDown: PropTypes.func,
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
  }

  onKeyDown(event) {
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

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators(InputActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(KeyboardInput)
