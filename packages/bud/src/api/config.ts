import type {Bud, WebpackConfiguration} from './types'

type Config = (this: Bud) => WebpackConfiguration

const config: Config = function () {
  return this.hooks
    .filter('bud.compiler.filter', this.compiler)
    .buildConfig().config
}

export {config}
export type {Config}
