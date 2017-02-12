export default class WaveTable {
  constructor(buffer, length = 1024) {
    this.fft(buffer, length)
    /*
    this.real = new Float32Array(length)
    this.imag = new Float32Array(length)
    const bufferSize = buffer.length
    for (let i = 0; i < length; i += 1) {
      for (let j = 0; j < length; j += 1) {
        const d = buffer[((j / length) * bufferSize) | 0]
        const th = ((i * j) / length) * (2 * Math.PI)
        this.real[i] += Math.cos(th) * d
        this.imag[i] += Math.cos(th) * d
      }
    }
    */
  }
  /* eslint no-bitwise: ["error", { "int32Hint": true }] */
  /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
  fft(waveform, len) {
    const real = new Float32Array(len)
    const imag = new Float32Array(len)
    const wavlen = waveform.length
    for (let i = 0; i < len; ++i) {
      for (let j = 0; j < len; ++j) {
        const wavj = j / len * wavlen
        const d = waveform[wavj | 0]
        const th = i * j / len * 2 * Math.PI
        real[i] += Math.cos(th) * d
        imag[i] += Math.sin(th) * d
      }
    }
    this.real = real
    this.imag = imag
  }

  createPeriodicWave(audioCtx) {
    console.log(audioCtx)
    return audioCtx.createPeriodicWave(
      this.real,
      this.imag,
    )
  }
}
