import type {Bud, WebpackConfiguration} from './types'

const config = function (this: Bud): WebpackConfiguration {
  this.logger.info({name: 'bud.api', function: 'bud.config'}, `bud.config called`)

  const compiler = this.hooks.filter('bud.compiler.filter', this.compiler)

  return compiler.buildConfig()
}

export {config}
