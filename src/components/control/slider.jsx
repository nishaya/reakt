import React, { Component, PropTypes } from 'react'
import Slider from 'material-ui/Slider'

export default class SliderControl extends Component {
  static propTypes = {
    value: PropTypes.number,
    label: PropTypes.string,
    onChanged: PropTypes.func,
    width: PropTypes.number,
  }

  static defaultProps = {
    value: 0,
    label: 'Untitled Control',
    width: 128,
    onChanged: value => (
      console.log(`value changed to ${value}`)
    ),
  }

  onSliderMoving(value) {
    if (this.sliderMoving) {
      this.props.onChanged(parseInt(value, 10))
    }
  }

  sliderMoving = false

  shouldComponetUpdate(nextProps) {
    /**
     * UI操作の結果がpropsに戻ってくるまで更新したくないので、
     * props.valueが変更された時のみ更新する
     */
    return this.props.value !== nextProps.value
  }

  render() {
    return (<div>
      <h3>{this.props.label}</h3>
      <div>value: {this.props.value}</div>
      <Slider
        style={{ width: this.props.width }}
        value={this.props.value}
        min={0}
        max={127}
        onChange={(e, value) => this.onSliderMoving(value)}
        onDragStart={() => { this.sliderMoving = true }}
        onDragStop={() => { this.sliderMoving = false }}
      />
    </div>)
  }
}
