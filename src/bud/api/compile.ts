import type {Bud} from './types'

const compile = function (this: Bud): void {
  const compiler = this.hooks.filter('compiler', this.compiler)
  compiler(this)
}

export {compile}
