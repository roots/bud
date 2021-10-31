import {Extension, Framework} from '@roots/bud-framework'
import {posix} from 'path'

import {HtmlWebpackPlugin} from '../../services/html-webpack-plugin'

export type BudHtmlWebpackPlugin = Extension.CompilerPlugin<
  HtmlWebpackPlugin,
  HtmlWebpackPlugin.Options
>

export const BudHtmlWebpackPlugin: BudHtmlWebpackPlugin = {
  name: 'html-webpack-plugin',

  options(app: Framework) {
    const fromEnv = app.env
      .getEntries()
      .filter(([k]: [string, string]) => k.includes('PUBLIC'))
      .reduce(
        (a, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
        {},
      )

    const fromStore = app.store.get(
      'extension.webpack-define-plugin',
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
      ...(app.store.get('extension.html-webpack-plugin') ?? {}),
    }
  },

  make: options => new HtmlWebpackPlugin(options.all()),

  when: ({store}) => store.isTrue('html'),
}

export {HtmlWebpackPlugin}
