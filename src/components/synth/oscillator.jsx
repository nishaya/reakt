import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Slider from 'material-ui/Slider'

class OscillatorComponent extends Component {
  static propTypes = {
    noteOn: PropTypes.shape(),
    controlChange: PropTypes.shape(),
  }

  static defaultProps = {
    noteOn: {},
    controlChange: {},
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  renderSliders() {
    const sliders = []
    for (let i = 20; i <= 27; i += 1) {
      sliders.push((<Slider
        key={`slider_${i}`}
        min={0}
        max={127}
        value={this.props.controlChange[i]}
      />))
    }
    return sliders
  }

  render() {
    return (<div>
      <div>
        {Object.keys(this.props.noteOn).map(note =>
          (<div key={`note_${note}`} style={{ display: 'inline' }}>{this.props.noteOn[note] ? 'o' : '-'}</div>),
        )}
      </div>
      <div>
        {this.renderSliders()}
      </div>
    </div>)
  }
}

const mapStateToProps = state => ({
  noteOn: state.midi.noteOn,
  controlChange: state.midi.controlChange,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(OscillatorComponent)
