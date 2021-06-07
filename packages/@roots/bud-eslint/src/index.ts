import {Extension} from './interface'
import EslintPlugin from 'eslint-webpack-plugin'
import {Eslint} from './api'

const extension: Extension = {
  name: 'eslint-webpack-plugin',

  register: ({cache, path}) => {
    cache.cacheFiles = [
      ...cache.cacheFiles,
      path('storage', 'cache/eslint.json'),
    ]
  },

  options: ({path, store}) => ({
    extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    cache: true,
    cacheLocation: path('storage', 'cache/eslint.json'),
    context: path('src'),
    cwd: path('project'),
    exclude: store.get('patterns.module'),
    failOnError: true,
  }),

  make: options => new EslintPlugin(options.all()),

  api: app => ({
    eslint: new Eslint(app),
  }),

  when: app => app.discovery.hasPeerDependency('eslint'),
}

export default extension
export const {name, options, make} = extension
export type {Extension}
