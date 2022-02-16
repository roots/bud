import {Configuration} from 'webpack'

import type {Framework} from '../'

/**
 * @public
 */
export interface publicPath {
  (): Configuration['output']['publicPath']
}

/**
 * @public
 */
export const publicPath: publicPath =
  function (): Configuration['output']['publicPath'] {
    const ctx: Framework = this as Framework

    const value: Configuration['output']['publicPath'] =
      ctx.hooks.filter<'build.output.publicPath'>(
        'build.output.publicPath',
      )

    return value
  }
