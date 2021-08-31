import type {
  Framework,
  WebpackPlugin,
} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

interface Options {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}

interface BudConfigDumpPlugin
  extends WebpackPlugin<WebpackConfigDumpPlugin, Options> {}

const BudConfigDumpPlugin: BudConfigDumpPlugin = {
  name: 'webpack-config-dump-plugin',

  make: (options: Container<Options>) =>
    new WebpackConfigDumpPlugin(options.all()),

  when: ({store}) => store.isTrue('debug'),

  options: (app: Framework) => ({
    ...(app.store.get('extension.webpackConfigDumpPlugin') ??
      {}),
    outputPath: (() => app.path('storage'))(),
    name: `${app.name}.webpack.config.js`,
  }),
}

export const {name, make, when, options} = BudConfigDumpPlugin
