import {Module} from '@roots/bud-framework'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import {posix} from 'path'

interface Extension extends Module {
  options: Module.Options<HtmlWebpackPlugin.Options>
  make: Module.Make<HtmlWebpackPlugin, HtmlWebpackPlugin.Options>
  when: Module.When<HtmlWebpackPlugin.Options>
}

const extension: Extension = {
  name: 'html-webpack-plugin',

  options(app) {
    const fromEnv = app.env
      .getEntries()
      .filter(([k]: [string, string]) => k.includes('PUBLIC'))
      .reduce(
        (a, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
        {},
      )

    const fromStore = app.store.get(
      'extension.webpackDefinePlugin',
    )

    return {
      publicPath: app.publicPath(),
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
      ...(app.store.get('extension.htmlWebpackPlugin') ?? {}),
    }
  },

  make: options => new HtmlWebpackPlugin(options.all()),

  when: ({store}) => store.isTrue('html'),
}

export const {name, options, make, when} = extension
export {HtmlWebpackPlugin}
