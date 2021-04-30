import Plugin, {Options} from 'html-webpack-plugin'
import {Framework, Hooks, Module} from '@roots/bud-framework'
import {posix} from 'path'

interface Extension extends Module {
  name: `${keyof Hooks.Extension.Definitions & string}`
  options: Module.Options<Options>
  make: Module.Make<Plugin, Options>
  when: Module.When<Options>
}

const extension: Extension = {
  name: 'html-webpack-plugin',
  options: (app: Framework): Options => ({
    publicPath: app.publicPath(),
    template: posix.resolve(
      require.resolve('@roots/bud-support'),
      '../../../publish/template.html',
    ),
    ...(app.store.get('extension.htmlWebpackPlugin') ?? {}),
  }),
  make: options => new Plugin(options.all()),
  when: ({store}) => store.isTrue('html'),
}

export {extension as default, Plugin}
