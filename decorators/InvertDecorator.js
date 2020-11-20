import { RUNNING, SUCCESS, FAILURE } from '../constants.js'
import Decorator from '../Decorator.js'

export default class InvertDecorator extends Decorator {
  nodeType = 'InvertDecorator'

  decorate (run) {
    const result = run()
    if (result === RUNNING) return RUNNING
    return result === SUCCESS ? FAILURE : SUCCESS
  }
}
