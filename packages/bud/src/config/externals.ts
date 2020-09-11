import type {Bud} from '@roots/bud-types'
import type {WebpackExternals} from '@roots/bud-types'

type ExternalsBuilder = (bud: Bud) => WebpackExternals

const externals: ExternalsBuilder = bud =>
  bud.hooks.filter('webpack.externals', {
    externals: bud.options.get('webpack.externals'),
  })

export {externals}
export type {ExternalsBuilder}
