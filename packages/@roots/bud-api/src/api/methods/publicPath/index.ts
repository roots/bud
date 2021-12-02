import type {Framework} from '@roots/bud-framework'
import {Configuration} from 'webpack'

export interface publicPath {
  (): Configuration['output']['publicPath']
}

export const publicPath: publicPath =
  function (): Configuration['output']['publicPath'] {
    const ctx: Framework = this as Framework

    const value: Configuration['output']['publicPath'] =
      ctx.hooks.filter<'build.output.publicPath'>(
        'build.output.publicPath',
      )

    ctx.api.log('log', {message: 'publicPath', suffix: value})

    return value
  }
