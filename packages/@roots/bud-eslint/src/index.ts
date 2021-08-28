import {Framework, WebpackPlugin} from '@roots/bud-framework'
import EslintPlugin, {Options} from 'eslint-webpack-plugin'

import {EslintConfig} from './api'

interface Extension
  extends WebpackPlugin<EslintPlugin, Options> {
  api: (app: Framework) => {
    eslint: EslintConfig
  }
}

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure eslint options
     */
    eslint: EslintConfig
  }

  namespace Framework {
    interface Extensions {
      'eslint-webpack-plugin': Extension
    }
  }
}

const extension: WebpackPlugin<EslintPlugin, Options> = {
  name: 'eslint-webpack-plugin',

  options: ({path, store}) => ({
    extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
    cache: true,
    cacheLocation: path('storage', 'cache', 'eslint.json'),
    context: path('src'),
    cwd: path('project'),
    exclude: store.get('patterns.module'),
    failOnError: true,
  }),

  make: options => new EslintPlugin(options.all()),

  api: app => ({
    eslint: new EslintConfig(app),
  }),

  when: app => app.project.hasPeerDependency('eslint'),
}

export const {name, options, make} = extension
