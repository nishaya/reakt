export default class SuperOscillator {
  oscs = []

  static freq2cent(freq) {
    return (1200 * Math.log2(freq / 440)) + 5700
  }

  static cent2freq(cent) {
    return 440 * (2 ** ((cent - 5700) / 1200))
  }

  static genDetunedFreq(frequency, cent) {
    const freqCent = SuperOscillator.freq2cent(frequency)
    const centFreq = SuperOscillator.cent2freq(freqCent + cent)
    console.log('genDetunedFreq', frequency, cent, freqCent, centFreq)
    return centFreq
  }

  constructor(context, options) {
    this.oscs = [-1220, -1180, -20, 0, 20, 1180, 1220]
      .map(cent => (
        new OscillatorNode(
          context,
          {
            ...options,
            frequency: SuperOscillator.genDetunedFreq(options.frequency, cent),
          },
        )
      ))
  }

  start(when) {
    this.oscs.forEach(osc => osc.start(when))
  }

  connect(node) {
    this.oscs.forEach(osc => osc.connect(node))
  }

  stop(when) {
    this.oscs.forEach(osc => osc.stop(when))
  }
}
