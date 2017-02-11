import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import MidiActions from 'actions/midi'

class PadInput extends Component {
  static propTypes = {
    midiControlChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = {
      xControlNumber: 71,
      yControlNumber: 74,
      xValue: 0,
      yValue: 0,
    }

    this.lastX = null
    this.lastY = null
  }

  mouseMove(event) {
    const clientRect = event.target.getBoundingClientRect()
    const x = parseInt(((event.clientX - clientRect.left) / (clientRect.width - 2)) * 127, 10)
    const y = 127 - parseInt(((event.clientY - clientRect.top) / (clientRect.height - 2)) * 127, 10)
    if (this.lastX !== x) {
      this.props.midiControlChange(this.state.xControlNumber, x)
    }
    if (this.lastY !== y) {
      this.props.midiControlChange(this.state.yControlNumber, y)
    }
    this.setState({
      xValue: x,
      yValue: y,
    })
    this.lastX = x
    this.lastY = y
  }

  render() {
    return (<div className="reakt-component__container">
      <h2>Pad Input</h2>
      <div className="reakt-component__body">
        <div
          className="reakt-pad"
          onMouseMove={event => this.mouseMove(event)}
        />
        <div>x: {this.state.xValue}</div>
        <div>y: {this.state.yValue}</div>
      </div>
    </div>)
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => bindActionCreators(MidiActions, dispatch)
export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PadInput)
