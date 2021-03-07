import Plugin from 'ignore-emit-webpack-plugin'
import {Module} from '@roots/bud-typings'

export const name = 'ignore-emit-webpack-plugin'

export const options: Module.Options<{ignore: string[]}> = {
  ignore: [],
}

export const make: Module.Make<
  Plugin,
  {ignore: string[]}
> = options => new Plugin(options.get('ignore'))

export const when: Module.When = (app, options) =>
  options.getKeys('ignore')?.length > 0
