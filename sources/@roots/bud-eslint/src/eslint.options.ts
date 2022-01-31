import type {Framework} from '@roots/bud-framework'
import type {Options} from 'eslint-webpack-plugin'
import {cpus} from 'os'

export interface options {
  (app: Framework): Options
}

export const options: options = ({store, path}) => ({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cache: store.isTrue('features.cache'),
  cacheLocation: path('storage', 'cache', 'eslint.json'),
  cacheStrategy: 'content',
  context: path('src'),
  cwd: path('project'),
  emitError: true,
  emitWarning: true,
  failOnError: true,
  eslintPath: require.resolve('eslint'),
  resolvePluginsRelativeTo: path('project'),
  threads: cpus.length / 2,
})
