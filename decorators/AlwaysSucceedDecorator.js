import { RUNNING, SUCCESS } from '../constants.js'
import Decorator from '../Decorator.js'

export default class AlwaysSucceedDecorator extends Decorator {
  nodeType = 'AlwaysSucceedDecorator'

  decorate (run) {
    const result = run()
    if (result === RUNNING) return RUNNING
    return SUCCESS
  }
}
