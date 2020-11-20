import Decorator from './Decorator.js'
import Random from './Random.js'
import Selector from './Selector.js'
import Sequence from './Sequence.js'
import Task from './Task.js'
import AlwaysFailDecorator from './decorators/AlwaysFailDecorator.js'
import AlwaysSucceedDecorator from './decorators/AlwaysSucceedDecorator.js'
import CooldownDecorator from './decorators/CooldownDecorator.js'
import InvertDecorator from './decorators/InvertDecorator.js'
import LoopDecorator from './decorators/LoopDecorator.js'
import { registryLookUp } from './BehaviorTree.js'

export default class BehaviorTreeImporter {
  types = {
    task: Task,
    decorator: Decorator,
    selector: Selector,
    sequence: Sequence,
    random: Random,
    invert: InvertDecorator,
    fail: AlwaysFailDecorator,
    succeed: AlwaysSucceedDecorator,
    cooldown: CooldownDecorator,
    loop: LoopDecorator
  }

  defineType (type, Klass) {
    this.types[type] = Klass
  }

  parse (json) {
    const { type, name, node, nodes, ...config } = json
    const Klass = this.types[type]
    if (!Klass) {
      const registeredNode = registryLookUp(type)
      if (registeredNode) {
        registeredNode.name = name
        return registeredNode
      }
      throw new Error(`Don't know how to handle type ${type}. Please register this first.`)
    }

    return new Klass({
      name: name,
      node: node ? this.parse(node) : null,
      nodes: nodes ? nodes.map(subJson => this.parse(subJson)) : null,
      config
    })
  }
}

export { BehaviorTreeImporter };