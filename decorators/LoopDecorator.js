import { FAILURE } from '../constants.js'
import Decorator from '../Decorator.js'

export default class LoopDecorator extends Decorator {
  nodeType = 'LoopDecorator'

  setConfig ({ loop = Infinity }) {
    this.config = {
      loop
    }
  }

  decorate (run) {
    let i = 0
    let result = FAILURE
    while (i++ < this.config.loop) {
      result = run()
      if (result === FAILURE) return FAILURE
    }
    return result
  }
}
