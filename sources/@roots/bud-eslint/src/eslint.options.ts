import type {Framework} from '@roots/bud-framework'
import type {Options} from 'eslint-webpack-plugin'

export interface options {
  (app: Framework): Options
}

export const options: options = ({path}) => ({
  extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
  cache: true,
  cacheLocation: path('storage', 'cache', 'eslint.json'),
  context: path('src'),
  cwd: path('project'),
  failOnError: true,
})
