import type {Boot} from './types'

import * as svgr from './@svgr'
import * as refresh from './react-refresh'

/**
 * @roots/bud-react extension
 */
export const boot: Boot = ({build, mode, use}) => {
  /**
   * Register @babel/preset-react
   */
  build.items.merge('babel.options.presets', [
    '@babel/preset-react',
  ])

  /**
   * Register @svgr-loader
   */
  use(['@svgr', svgr])

  /**
   * The rest of the boot process only applies in dev.
   */
  if (!mode.is('development')) return

  /**
   * Register @pmmmwh/react-refresh-webpack-plugin
   */
  use(['@pmmmwh/react-refresh-webpack-plugin', refresh])

  build.items.merge('babel.options.plugins', [
    require.resolve('react-refresh/babel'),
  ])
}
