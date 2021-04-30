import {Module} from '@roots/bud-framework'
import Plugin from 'ignore-emit-webpack-plugin'

declare interface Options {
  ignore: RegExp[]
}

const plugin: Module<Plugin, Options> = {
  name: 'ignore-emit-webpack-plugin',
  options: ({store}) => ({
    ignore: store.isFalse('devtool') ? [] : [/.?.map$/],
  }),
  make: options => new Plugin(options.get('ignore')),
  when: (_app, options) => options?.get('ignore')?.length > 0,
}

export {plugin as default}
