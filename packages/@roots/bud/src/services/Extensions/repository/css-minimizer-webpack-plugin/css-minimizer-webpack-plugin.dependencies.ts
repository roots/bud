import {safeRequire} from '@roots/bud-support'

const CssMinimizerWebpackPlugin = safeRequire(
  'css-minimizer-webpack-plugin',
)
export const Plugin = CssMinimizerWebpackPlugin
