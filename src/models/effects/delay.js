export default class DelayEffect {
  constructor(audioCtx, time = 0.3461, volume = 0.5, feedback = 0.5) {
    this.delayNode = audioCtx.createDelay(10)
    this.time = time
    this.input = audioCtx.createGain()
    this.wet = audioCtx.createGain()
    this.feedbackNode = audioCtx.createGain()

    this.amount = volume
    this.feedback = feedback

    this.output = audioCtx.createGain()

    this.input.connect(this.wet)
    this.wet.connect(this.delayNode)
    this.delayNode.connect(this.output)
    this.delayNode.connect(this.feedbackNode)
    this.feedbackNode.connect(this.delayNode)
    this.input.connect(this.output)
    this.on = false
  }

  set on(value) {
    this.powerOn = value
    if (value) {
      console.log('power on')
      this.input.disconnect()
      this.input.connect(this.wet)
      this.input.connect(this.output)
    } else {
      console.log('power off')
      this.input.disconnect()
      this.input.connect(this.output)
    }
  }

  connect(destination) {
    console.log('connect 2 delay')
    this.output.connect(destination)
  }

  get destination() {
    return this.input
  }

  set time(time) {
    this.delayNode.delayTime.value = time
  }

  set amount(value) {
    this.wet.gain.value = value
  }

  set feedback(value) {
    this.feedbackNode.gain.value = value
  }
}
