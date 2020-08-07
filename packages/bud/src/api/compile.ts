import type {Bud} from './types'

const compile = function (this: Bud): void {
  this.logger.info({name: 'bud.api', function: 'bud.compile'}, `bud.compile called`)

  const compiler = this.hooks.filter('bud.compiler.filter', this.compiler)

  compiler.buildConfig().compile()
}

export {compile}
