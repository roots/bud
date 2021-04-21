import type {Module} from '@roots/bud-framework'

import {WebpackConfigDumpPlugin} from 'webpack-config-dump-plugin'

interface Options {
  outputPath?: string
  name?: string
  depth?: number
  keepCircularReferences?: boolean
  showFunctionNames?: boolean
  includeFalseValues?: boolean
}

/**
 * Extension name
 */
export const name = `webpack-config-dump-plugin`

/**
 * Extension make
 */
export const make: Module.Make<
  WebpackConfigDumpPlugin,
  Options
> = options => new WebpackConfigDumpPlugin(options.all())

/**
 * Extension when
 */
export const when: Module.When = ({store}) =>
  store.isTrue('debug')

/**
 * Extension options
 */
export const options: Module.Options<Options> = app => ({
  outputPath: app.path('storage'),
  ...(app.store.get('extension.webpackConfigDumpPlugin') ?? {}),
})
