export default class WaveTable {
  constructor(table, length = 1024) {
    this.table = table
    this.length = length
  }
  /* eslint no-bitwise: ["error", { "int32Hint": true }] */
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  fft(len) {
    const real = new Float32Array(len)
    const imag = new Float32Array(len)
    const wavlen = this.table.length
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        const wavj = j / len * wavlen
        const d = this.table[wavj | 0]
        const th = i * j / len * 2 * Math.PI
        real[i] += Math.cos(th) * d
        imag[i] += Math.sin(th) * d
      }
    }
    this.real = real
    this.imag = imag
  }

  createPeriodicWave(audioCtx, len) {
    this.fft(len)
    return audioCtx.createPeriodicWave(
      this.real,
      this.imag,
    )
  }

  static PRESETS = {
    '1_2': [1, -1],
    '1_4': [1, -1, -1, -1],
    '1_8': [1, -1, -1, -1, -1, -1, -1, -1],
    '1_16': [1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
    triangle: [
      0,
      -0.125,
      -0.25,
      -0.375,
      -0.5,
      -0.625,
      -0.75,
      -0.875,
      -1,
      -0.875,
      -0.75,
      -0.625,
      -0.5,
      -0.375,
      -0.25,
      -0.125,
      0,
      0.125,
      0.25,
      0.375,
      0.5,
      0.625,
      0.75,
      0.875,
      1,
      0.875,
      0.75,
      0.625,
      0.5,
      0.375,
      0.25,
      0.125,
    ],
  }

  static loadPreset(name) {
    return new WaveTable(WaveTable.PRESETS[name])
  }
}
