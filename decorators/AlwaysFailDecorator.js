import { RUNNING, FAILURE } from '../constants.js'
import Decorator from '../Decorator.js'

export default class AlwaysFailDecorator extends Decorator {
  nodeType = 'AlwaysFailDecorator'

  decorate (run) {
    const result = run()
    if (result === RUNNING) return RUNNING
    return FAILURE
  }
}
