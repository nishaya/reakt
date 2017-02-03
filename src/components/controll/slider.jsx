import React, { Component, PropTypes } from 'react'

export default class SliderControl extends Component {
  static propTypes = {
    value: PropTypes.numbers,
    label: PropTypes.string,
    // onChanged: PropTypes.func,
  }

  static defaultProps = {
    value: 0,
    label: 'Untitled Control',
  }

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
    </div>)
  }
}
