import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MidiActions from 'actions/midi'

class PadInput extends Component {
  static propTypes = {
    
  }

  constructor(props) {
    super(props)
    this.state = {
      xControlNumber: 71,
      yControlNumber: 74,
      xValue: 0,
      yValue: 0,
    }
  }

  mouseMove(event) {
    const clientRect = event.target.getBoundingClientRect()
    const x = parseInt(((event.clientX - clientRect.left) / clientRect.width) * 127, 10)
    const y = parseInt(((event.clientY - clientRect.top) / clientRect.height) * 127, 10)
    console.log(`CC: ${this.state.xControlNumber}, ${x}`)
    console.log(`CC: ${this.state.yControlNumber}, ${y}`)
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Pad Input</h2>
      <div className="reakt-component__body">
        <div
          className="reakt-pad"
          onMouseMove={event => this.mouseMove(event)}
        />
      </div>
    </div>)
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators(MidiActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PadInput)
