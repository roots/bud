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

  options: ({env, publicPath, store}) => {
    const fromEnv = env
      .getEntries()
      .filter(([k]: [string, string]) => k.includes('PUBLIC'))
      .reduce(
        (a, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
        {},
      )

    const fromStore = store.get('extension.webpackDefinePlugin')

    return {
      publicPath: publicPath(),
      template: posix.resolve(
        require.resolve('@roots/bud-support'),
        '../../../templates/template.html',
      ),
      window: {
        env: {
          ...fromEnv,
          ...fromStore,
        },
      },
      ...(store.get('extension.htmlWebpackPlugin') ?? {}),
    }
  },

  make: options => new PluginConstructor(options.all()),

  when: ({store}) => store.isTrue('html'),
}

export const {name, options, make, when} = extension
export {Plugin}
