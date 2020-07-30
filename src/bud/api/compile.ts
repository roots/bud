import type {Bud} from './types'

const compile = function (this: Bud): void {
  this.hooks.call('pre_node_process')
  this.util.setProcess(this)
  this.hooks.call('post_node_process')

  this.hooks.call('pre_compiler_call')
  this.compiler(this)
}

export {compile}
