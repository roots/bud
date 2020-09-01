import type {Bud} from '@roots/bud-typings'
import type {WebpackExternals} from '@roots/bud-typings'

type ExternalsBuilder = (bud: Bud) => WebpackExternals

const externals: ExternalsBuilder = bud =>
  bud.hooks.filter('webpack.externals', {
    externals: bud.options.get('webpack.externals'),
  })

export {externals}
export type {ExternalsBuilder}
