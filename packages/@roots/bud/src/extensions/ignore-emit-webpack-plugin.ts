import Plugin from 'ignore-emit-webpack-plugin'
import {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework/src'

/**
 * Framework extension ident
 */
export const name = 'ignore-emit-webpack-plugin'

/**
 * Publish
 */
export const publish: Module['publish'] = (app: Framework) => ({
  'extension/ignore-emit-webpack-plugin/options/ignore': () =>
    app.store.isFalse('options.devtool') ? [] : [/.?.map$/],
})

/**
 * Options
 */
export const options: Module.Options<{ignore: string[]}> = (
  app: Framework,
) => ({
  ignore: app.subscribe(
    'extension/ignore-emit-webpack-plugin/options/ignore',
  ),
})

/**
 * Plugin
 */
export const make: Module.Make<
  Plugin,
  {ignore: string[]}
> = options => new Plugin(options.get('ignore'))

/**
 * Conditionally load plugin
 */
export const when: Module.When = (app, options) =>
  options?.getEntries('ignore')?.length > 0
