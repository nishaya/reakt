import React, { Component } from 'react'

export default class KeyboardInput extends Component {
  constructor(props) {
    super(props)
    document.addEventListener('keydown', (event) => this.onKeyDown(event))
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
