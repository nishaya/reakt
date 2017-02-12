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
    console.log(audioCtx)
    return audioCtx.createPeriodicWave(
      this.real,
      this.imag,
    )
  }
}
