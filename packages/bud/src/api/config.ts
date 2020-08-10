import type {Bud, WebpackConfiguration} from './types'

const config = function (this: Bud): WebpackConfiguration {
  const compiler = this.hooks.filter('bud.compiler.filter', this.compiler)

  return compiler.buildConfig()
}

export {config}
