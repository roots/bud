import type {BudInterface} from '../'
import type {WebpackExternals} from '@roots/bud-types'

type ExternalsBuilder = (bud: BudInterface) => WebpackExternals

const externals: ExternalsBuilder = bud =>
  bud.hooks.filter('webpack.externals', {
    externals: bud.options.get('webpack.externals'),
  })

export {externals}
export type {ExternalsBuilder}
