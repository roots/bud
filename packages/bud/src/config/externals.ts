import type {BudInterface} from '../'
import type {Configuration} from 'webpack'
import type {Builder} from './'

export type ExternalsBuilder = (
  bud: BudInterface,
) => Configuration['externals'] | Builder

export const externals: ExternalsBuilder = bud =>
  bud.hooks.filter('webpack.externals', {
    externals: bud.options.get('webpack.externals'),
  })
