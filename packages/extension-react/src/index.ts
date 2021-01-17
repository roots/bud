import {Bud} from '@roots/bud'

import * as ReactRefreshWebpackPlugin from './react-refresh'

/**
 * Extension name
 */
export const name = '@roots/bud-react'

/**
 * Extension register
 */
export const register = (bud: Bud) => {
  bud.babel
    .addPreset('@babel/preset-react')
    .extensions.add(
      '@pmmmwh/react-refresh-webpack-plugin',
      ReactRefreshWebpackPlugin,
    )
}
