import type {Bud} from '@roots/bud-framework'
import type {Options} from 'eslint-webpack-plugin'
import {cpus} from 'os'

export interface options {
  (app: Bud): Options
}

export const options: options = ({path}) => ({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cacheLocation: path('@storage/cache/eslint.json'),
  cacheStrategy: 'content',
  cwd: path(),
  eslintPath: require.resolve('eslint'),
  resolvePluginsRelativeTo: path(),
  threads: cpus.length / 2,
})
