export default class DelayEffect {
  constructor(audioCtx, time = 1.0) {
    this.delayNode = audioCtx.createDelay(10)
    this.delayNode.delayTime.value = time
    this.output = audioCtx.createGain()
    this.delayNode.connect(this.output)
  }

  connect(destination) {
    console.log('connect 2 delay')
    this.output.connect(destination)
  }

  get destination() {
    return this.delayNode
  }

  set time(time) {
    this.delayNode.delayTime = time
  }

  // 1.0 = 100%
  set wet(value) {
    this.output.gain.value = value
  }
}
