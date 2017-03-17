import React, { Component, PropTypes } from 'react'
import PausedIcon from 'material-ui/svg-icons/av/pause'
import PlayingIcon from 'material-ui/svg-icons/av/play-arrow'

export default class Base extends Component {
  static propTypes = {
    label: PropTypes.string,
  }

  static defaultProps = {
    label: 'Base',
  }

  state = { playing: false }

  render() {
    return (<div className="reakt-drum__container">
      <h3>{this.props.label}</h3>
      <div>
        {this.state.playing ?
          (<PlayingIcon style={{ color: 'rgb(0, 188, 212)' }} />) :
          (<PausedIcon style={{ color: '#ccc' }} />)}
      </div>
    </div>)
  }
}
