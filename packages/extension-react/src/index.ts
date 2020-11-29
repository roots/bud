import type {Boot} from './types'

import * as svgr from './@svgr'
import * as refresh from './react-refresh'

/**
 * @roots/bud-react extension
 */
export const boot: Boot = ({build, use}) => {
  /**
   * Register @babel/preset-react
   */
  build.items.merge('babel.options.presets', [
    '@babel/preset-react',
  ])

  /**
   * Register @pmmmwh/react-refresh-webpack-plugin
   */
  use(['@pmmmwh/react-refresh-webpack-plugin', refresh])

  /**
   * Register @svgr-loader
   */
  use(['@svgr', svgr])
}
