export default class DistortionEffect {
  constructor(audioCtx, amount = 1.0) {
    this.waveShaperNode = audioCtx.createWaveShaper()
    this.output = audioCtx.createGain()
    this.amount = amount
    this.waveShaperNode.connect(this.output)
  }

  connect(destination) {
    console.log('connect 2 distortion')
    this.output.connect(destination)
  }

  get destination() {
    return this.waveShaperNode
  }

  set amount(value) {
    this.output.gain.value = value
  }
}
