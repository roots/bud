import {Module} from '@roots/bud-framework'
import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

interface Options {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}

export const name = `webpack-config-dump-plugin`

export const make: Module.Make<
  WebpackConfigDumpPlugin,
  Options
> = options => new WebpackConfigDumpPlugin(options.all())

export const when: Module.When = ({store}) =>
  store.isTrue('debug')

export const options: Module.Options<Options> = app => ({
  ...(app.store.get('extension.webpackConfigDumpPlugin') ?? {}),
  outputPath: app.path('storage'),
  name: `webpack.config.js`,
})
