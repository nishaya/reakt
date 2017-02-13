export default class SuperOscillator {
  oscs = []
  gains = new WeakMap()

  static freq2cent(freq) {
    return (1200 * Math.log2(freq / 440)) + 5700
  }

  static cent2freq(cent) {
    return 440 * (2 ** ((cent - 5700) / 1200))
  }

  static genDetunedFreq(frequency, cent) {
    return SuperOscillator.cent2freq(SuperOscillator.freq2cent(frequency) + cent)
  }

  constructor(context, options) {
    const cents = [-1200, -20, 0, 20, 1200]
    this.oscs = cents
      .map((cent) => {
        const osc = new OscillatorNode(
          context,
          {
            ...options,
            frequency: SuperOscillator.genDetunedFreq(options.frequency, cent),
          },
        )
        const gain = context.createGain()
        gain.gain.value = 0.15
        osc.connect(gain)
        this.gains.set(osc, gain)
        return osc
      })
  }

  start(when) {
    this.oscs.forEach(osc => osc.start(when))
  }

  connect(node) {
    this.oscs.forEach(osc => this.gains.get(osc).connect(node))
  }

  stop(when) {
    this.oscs.forEach(osc => osc.stop(when))
  }
}
