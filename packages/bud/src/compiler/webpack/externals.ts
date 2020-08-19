import type {Bud} from './types'
import type {WebpackExternals} from '@roots/bud-typings'

type ExternalsBuilder = (bud: Bud) => WebpackExternals

const externals: ExternalsBuilder = bud =>
  bud.hooks.filter('webpack.externals', {
    externals: bud.options.get('externals'),
  })

export {externals}
export type {ExternalsBuilder}
