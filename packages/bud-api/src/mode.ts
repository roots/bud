import {Framework} from '@roots/bud-framework'
import {Webpack} from '@roots/bud-support'

export function mode(
  this: Framework,
  mode?: Webpack.Configuration['mode'],
) {
  if (mode) {
    this.options.set('mode', mode)
    return this
  }

  return this.options.get<Webpack.Configuration['mode']>('mode')
}
