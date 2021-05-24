import * as Plugin from 'html-webpack-plugin'
import {Module} from '@roots/bud-framework'
import {posix} from 'path'

const PluginConstructor = Plugin.default

interface Extension extends Module {
  options: Module.Options<Plugin.Options>
  make: Module.Make<Plugin, Plugin.Options>
  when: Module.When<Plugin.Options>
}

const extension: Extension = {
  name: 'html-webpack-plugin',

  options: ({publicPath, store}) => ({
    publicPath: publicPath(),
    template: posix.resolve(
      require.resolve('@roots/bud-support'),
      '../../../templates/template.html',
    ),
    ...(store.get('extension.htmlWebpackPlugin') ?? {}),
  }),

  make: options => new PluginConstructor(options.all()),

  when: ({store}) => store.isTrue('html'),
}

export {extension as default, PluginConstructor as Plugin}
export const {name, options, make, when} = extension
