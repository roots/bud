import {Plugin} from './ignore-emit-webpack-plugin.dependencies'
import {Model} from './ignore-emit-webpack-plugin.interface'

const plugin: Model = {
  name: 'ignore-emit-webpack-plugin',

  options: ({store}) => ({
    ignore: store.is('features.devtool', false)
      ? []
      : [/.?.map$/],
  }),

  make: options => new Plugin(options.get('ignore')),

  when: (_app, options) => options?.get('ignore')?.length > 0,
}

export const {name, options, make, when} = plugin
