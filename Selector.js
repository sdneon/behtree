import { SUCCESS, FAILURE } from './constants.js'
import BranchNode from './BranchNode.js'

export default class Selector extends BranchNode {
  nodeType = 'Selector'
  START_CASE = FAILURE
  OPT_OUT_CASE = SUCCESS
}
export { Selector };