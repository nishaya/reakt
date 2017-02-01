import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Checkbox from 'material-ui/Checkbox'

class OscillatorComponent extends Component {
  static propTypes = {
    noteOn: PropTypes.shape(),
    controlChange: PropTypes.shape(),
  }

  static defaultProps = {
    noteOn: [],
    controlChange: [],
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    return (<div>
      {Object.keys(this.props.noteOn).map(note =>
        (<div key={`note_${note}`} style={{ display: 'inline' }}>{this.props.noteOn[note] ? 'o' : '-'}</div>),
      )}
    </div>)
  }
}

const mapStateToProps = state => ({
  noteOn: state.midi.noteOn,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true },
)(OscillatorComponent)
