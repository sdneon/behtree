import { SUCCESS, FAILURE } from './constants.js'
import BranchNode from './BranchNode.js'

export default class Sequence extends BranchNode {
  nodeType = 'Sequence'
  START_CASE = SUCCESS
  OPT_OUT_CASE = FAILURE
}
export { Sequence };