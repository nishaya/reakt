import React, { Component } from 'react'

class KeyboardInput extends Component {
  construct(props) {
    super(props)
    document.addEventListener('keydown', this.onKeyDown)
    this.state = {
      key: null,
    }
  }

  onKeyDown(event) {
    this.setState({ key: event.key })
  }

  render() {
    return (<div>
      pressed key: {this.state.key}
    </div>)
  }
}
