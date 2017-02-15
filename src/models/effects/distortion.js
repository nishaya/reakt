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
  }

  connect(destination) {
    console.log('connect 2 distortion')
    this.output.connect(destination)
  }

  get destination() {
    return this.input
  }

  set inputGain(volume) {
    this.input.gain.value = volume
  }

  set volume(volume) {
    this.output.gain.value = volume
  }

  set amount(amount) {
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
