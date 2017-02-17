import React, { Component, PropTypes } from 'react'
import EG from 'components/synth/eg'

export default class FilterEG extends EG {
  static defaultProps = {
    label: 'FilterEG',
  }

  generateEnvelop(filter, frequency = 1500) {
    const filterNode = filter || this.props.audioCtx.createFilter()
    const now = this.props.audioCtx.currentTime
    const attackTime = now + this.state.attack + EG.ATTACK_OFFSET
    const decayTime = attackTime + this.state.decay
    filterNode.gain.setValueAtTime(0, now)
    filterNode.gain.linearRampToValueAtTime(
      1.0 * frequency,
      attackTime,
    )
    filterNode.gain.linearRampToValueAtTime(
      this.state.sustain * frequency,
      decayTime,
    )
    return filterNode
  }
}
