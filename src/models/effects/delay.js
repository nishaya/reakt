export default class Delay {
  constructor(audioCtx, time = 1.0) {
    this.delayNode = audioCtx.createDelay(time)
    this.output = audioCtx.createGain()
    this.delayNode.connect(this.output)
  }

  connect(destination) {
    this.output.connect(destination)
  }

  get destination() {
    return this.output
  }

  set time(time) {
    this.delayNode.delayTime = time
  }

  // 1.0 = 100%
  set wet(value) {
    this.output.gain.value = value
  }
}
