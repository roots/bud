import {Plugin} from './clean-webpack-plugin.dependencies'
import type {
  Container,
  Extension,
  Options,
} from './clean-webpack-plugin.interface'

/**
 * @public
 */
export const label: Extension['label'] = 'clean-webpack-plugin'

/**
 * @public
 */
export const options: Extension['options'] = {
  cleanStaleWebpackAssets: true,
  protectWebpackAssets: true,
  cleanOnceBeforeBuildPatterns: ['**/*', '!dll'],
}

/**
 * @public
 */
export const make: Extension['make'] = (options: Container<Options>) =>
  new Plugin(options.all())

/**
 * @public
 */
export const when: Extension['when'] = ({store}) =>
  store.is('features.clean', true)
