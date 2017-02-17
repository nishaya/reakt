import React, { Component, PropTypes } from 'react'
import EG from 'components/synth/eg'

export default class FilterEG extends EG {
  static defaultProps = {
    label: 'FilterEG',
  }

  generateEnvelop(gain, volume = 1.0) {
    const gainNode = gain || this.props.audioCtx.createGain()
    const now = this.props.audioCtx.currentTime
    const attackTime = now + this.state.attack + EG.ATTACK_OFFSET
    const decayTime = attackTime + this.state.decay
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(
      1.0 * volume,
      attackTime,
    )
    gainNode.gain.linearRampToValueAtTime(
      this.state.sustain * volume,
      decayTime,
    )
    return gainNode
  }
}
