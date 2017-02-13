/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
export default class NoiseGenerator {
  static generateWhiteNoise(audioContext) {
    const bufferSize = audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const output = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1
    }
    return buffer
  }

  static generatePinkNoise(audioContext) {
    const bufferSize = audioContext.sampleRate
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
    const output = buffer.getChannelData(0)
    const b = Array(7).fill(0.0)
    /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1
      b[0] = 0.99886 * b[0] + white * 0.0555179
      b[1] = 0.99332 * b[1] + white * 0.0750759
      b[2] = 0.96900 * b[2] + white * 0.1538520
      b[3] = 0.86650 * b[3] + white * 0.3104856
      b[4] = 0.55000 * b[4] + white * 0.5329522
      b[5] = -0.7616 * b[5] - white * 0.0168980
      output[i] = (b[0] + b[1] + b[2] + b[3] + b[4] + b[5] + b[6] + white * 0.5362) * 0.11
      b[6] = white * 0.115926
    }
    return buffer
  }
}
