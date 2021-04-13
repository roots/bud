import type {Framework, Module} from '@roots/bud-framework'

import Plugin from 'ignore-emit-webpack-plugin'

/**
 * Framework extension ident
 */
export const name = 'ignore-emit-webpack-plugin'

/**
 * Options
 */
export const options: Module.Options<{ignore: string[]}> = (
  app: Framework,
) => ({
  ignore: app.store.isFalse('options.devtool')
    ? []
    : [/.?.map$/],
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
  options?.get('ignore')?.length > 0
