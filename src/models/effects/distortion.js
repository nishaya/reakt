export default class DistortionEffect {
  constructor(audioCtx, amount = 0.3, inputGain = 1.5, volume = 0.3) {
    this.waveShaperNode = audioCtx.createWaveShaper()
    this.output = audioCtx.createGain()
    this.input = audioCtx.createGain()
    this.amount = amount
    this.inputGain = inputGain
    this.volume = volume
    this.input.connect(this.waveShaperNode)
    this.waveShaperNode.connect(this.output)
    this.on = false
  }

  connect(destination) {
    console.log('connect 2 distortion')
    this.output.connect(destination)
  }

  set on(value) {
    this.powerOn = value
    if (value) {
      console.log('power on')
      this.input.disconnect()
      this.input.gain.value = this.inputGainValue
      this.output.gain.value = this.volumeValue
      this.input.connect(this.waveShaperNode)
    } else {
      console.log('power off')
      this.input.disconnect()
      this.input.gain.value = 1.0
      this.output.gain.value = 1.0
      this.input.connect(this.output)
    }
  }

  get destination() {
    return this.input
  }

  set inputGain(volume) {
    this.inputGainValue = volume
    if (!this.powerOn) {
      return
    }
    this.input.gain.value = volume
  }

  set volume(volume) {
    this.volumeValue = volume
    if (!this.powerOn) {
      return
    }
    this.output.gain.value = volume
  }

  set amount(amount) {
    this.amountValue = amount
    if (!this.powerOn) {
      return
    }
    this.waveShaperNode.curve = DistortionEffect.generateCurve(amount)
  }

  static generateCurve(amountValue = 1.0, numSamples = 4096) {
    let amount = amountValue
    console.log('generateCurve', amount)
    if (amount <= 0) {
      return null
    }
    if (amount >= 1.0) { amount = 0.999 }
    const curves = new Float32Array(numSamples)
    const k = (2 * amount) / (1 - amount)
    for (let i = 0; i < numSamples; i += 1) {
      const x = (((i - 0) * (1 - (-1))) / (numSamples - 0)) + (-1)
      curves[i] = ((1 + k) * x) / (1 + k * Math.abs(x))
    }
    return curves
  }
}
