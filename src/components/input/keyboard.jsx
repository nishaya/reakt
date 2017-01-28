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
  }

  onKeyDown(event) {
    this.setState({ key: event.key })
    this.props.keyDown(event.key)
  }

  render() {
    return (<div>
      pressed key: {this.state.key}
    </div>)
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => bindActionCreators(InputActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(KeyboardInput)
