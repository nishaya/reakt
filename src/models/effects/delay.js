export default class DelayEffect {
  constructor(audioCtx, time = 0.3461, volume = 0.5, feedback = 0.5) {
    this.delayNode = audioCtx.createDelay(10)
    this.delayNode.delayTime.value = time
    this.input = audioCtx.createGain()
    this.wet = audioCtx.createGain()
    this.feedback = audioCtx.createGain()

    this.wet.gain.value = volume
    this.feedback.gain.value = feedback

    this.output = audioCtx.createGain()

    this.input.connect(this.wet)
    this.wet.connect(this.delayNode)
    this.delayNode.connect(this.output)
    this.delayNode.connect(this.feedback)
    this.feedback.connect(this.delayNode)
    this.input.connect(this.output)
  }

  connect(destination) {
    console.log('connect 2 delay')
    this.output.connect(destination)
  }

  get destination() {
    return this.input
  }

  set time(time) {
    this.delayNode.delayTime = time
  }
}
