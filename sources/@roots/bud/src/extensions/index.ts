import type {Config} from '@roots/bud-framework'

/**
 * Built-in extensions factory
 *
 * @returns Records of built-in compiler plugins
 *
 * @public
 */
const extensions: Config.Context['extensions'] = [
  `@roots/bud-terser/extension`,
  `@roots/bud/extensions/bud-cdn`,
  `@roots/bud/extensions/bud-esm`,
  `@roots/bud/extensions/clean-webpack-plugin`,
  `@roots/bud/extensions/webpack-provide-plugin`,
  `@roots/bud/extensions/webpack-remove-empty-scripts`,
  `@roots/bud/extensions/webpack-manifest-plugin`,
  `@roots/bud/extensions/webpack-hot-module-replacement-plugin`,
  `@roots/bud/extensions/webpack-define-plugin`,
  `@roots/bud/extensions/mini-css-extract-plugin`,
  `@roots/bud/extensions/copy-webpack-plugin`,
]

export default extensions
