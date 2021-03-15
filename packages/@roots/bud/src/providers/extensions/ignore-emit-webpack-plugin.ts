import Plugin from 'ignore-emit-webpack-plugin'
import {Module} from '@roots/bud-typings'
import {Framework} from '@roots/bud-framework/src'

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
  ignore:
    app.subscribe('build/devtool') === false ? [] : [/.?.map$/],
})

/**
 * Plugin
 */
export const make: Module.Make<
  Plugin,
  {ignore: string[]}
> = options => new Plugin(options.get('ignore'))

/**
 * Use plugin when there is something to ignore
 */
export const when: Module.When = (app, options) =>
  options?.getEntries('ignore')?.length > 0
